import isArray from 'lodash-es/isArray';
import isEmpty from 'lodash-es/isEmpty';
import isObject from 'lodash-es/isObject';

const countNames = (fields): Record<string, number> =>
    (isArray(fields) ? fields : []).reduce((counts, field) => {
        const { name = null } = field || {};
        return name !== null ? { ...counts, [name]: (counts[name] || 0) + 1 } : counts;
    }, {});

// Keeps of a list of fields what the parser reads. The parser finds a field by its name (the first
// one), so a field is kept with its name, theme and sub-fields when it has a theme or sub-fields,
// or when its name is used elsewhere in the same lookup (another field, a repeatable state)
const getThemeFields = (fields, keepNames: string[] = []) => {
    if (!isArray(fields)) {
        return fields;
    }
    const counts = countNames(fields);
    return fields
        .filter((field) => {
            const { name = null, theme, fields: subFields } = field || {};
            return (
                typeof theme !== 'undefined' ||
                typeof subFields !== 'undefined' ||
                (name !== null && (counts[name] > 1 || keepNames.indexOf(name) !== -1))
            );
        })
        .map(({ name, theme, fields: subFields }) => ({
            name,
            ...(typeof theme !== 'undefined' ? { theme } : null),
            ...(typeof subFields !== 'undefined' ? { fields: getThemeFields(subFields) } : null),
        }));
};

class ThemeParser {
    screensManager;

    definitionCache: Record<string, { definition: unknown; themeScreen: unknown }>;

    fieldsCache: Record<
        string,
        { fields?: Record<string, unknown>[] | null; repetableStates?: Record<string, unknown>[] }
    >;

    themePattern: Record<string, unknown> | null;

    /**
     * The part of a screen definition that the parser reads, to precompute at build time (see
     * scripts/lib/getScreenFields.js): the parser then gives the same result without the definition
     */
    static getThemePattern(definition) {
        const { id = null, fields, states = null } = definition || {};
        const repeatableIds = (states || [])
            .filter(({ repeatable = false }) => repeatable === true)
            .map(({ id: stateId = null }) => stateId)
            .filter((stateId) => stateId !== null);
        // The fields of the screen and of its other states are looked up together
        const lookupCounts = countNames(
            (states || [])
                .filter(({ repeatable = false }) => repeatable === false)
                .reduce(
                    (allFields, { fields: stateFields = null }) =>
                        isArray(stateFields) ? [...allFields, ...stateFields] : allFields,
                    isArray(fields) ? fields : [],
                ),
        );
        const keepNames = [
            ...repeatableIds,
            ...Object.keys(lookupCounts).filter((name) => lookupCounts[name] > 1),
        ];
        return {
            id,
            ...(typeof fields !== 'undefined'
                ? { fields: getThemeFields(fields, keepNames) }
                : null),
            ...(states !== null && states.length > 0
                ? {
                      states: states.map(
                          ({ id: stateId, repeatable, theme, fields: stateFields }) => ({
                              id: stateId,
                              ...(typeof repeatable !== 'undefined' ? { repeatable } : null),
                              ...(typeof theme !== 'undefined' ? { theme } : null),
                              ...(typeof stateFields !== 'undefined'
                                  ? { fields: getThemeFields(stateFields, keepNames) }
                                  : null),
                          }),
                      ),
                  }
                : null),
        };
    }

    constructor({ screensManager }) {
        this.screensManager = screensManager;
        this.definitionCache = {};
        this.fieldsCache = {};
        // Precomputed patterns, used for the screens whose definition has no fields (ex.: the lazy
        // screens of the viewer, which only have their component)
        const { theme: themePattern = null } =
            (screensManager !== null && typeof screensManager.getFieldsPattern === 'function'
                ? screensManager.getFieldsPattern()
                : null) || {};
        this.themePattern = themePattern;
    }

    getDefinition(type) {
        const definition = this.screensManager.getDefinition(type) || null;
        const { fields } = definition || {};
        if (typeof fields === 'undefined' && this.themePattern !== null) {
            return this.themePattern[type] || definition;
        }
        return definition;
    }

    getDefinitionByScreen(type, themeComponents) {
        if (typeof this.definitionCache[type] === 'undefined') {
            const definition = this.getDefinition(type) || {};
            const themeScreen = themeComponents.find((it) => it.type === type) || null;
            this.definitionCache[type] = { definition, themeScreen };
        }
        return this.definitionCache[type];
    }

    getFieldsForDefinition(definition) {
        const { id: definitionId = null, fields = [], states = [] } = definition || {};
        if (typeof this.fieldsCache[definitionId] === 'undefined') {
            if (states === null || states.length === 0) {
                this.fieldsCache[definitionId] = { fields };
            } else {
                // TODO: test this
                let finalFields = fields;
                let repetableStates = [];
                if (states !== null && states.length > 0) {
                    const nonRepetableStates = states.filter(
                        ({ repeatable = false }) => repeatable === false,
                    );
                    repetableStates = states.filter(
                        ({ repeatable = false }) => repeatable === true,
                    );
                    finalFields = nonRepetableStates.reduce((acc, it) => {
                        const { fields: itemFields = [] } = it || {};
                        if (itemFields !== null && itemFields.length > 0) {
                            return acc.concat(itemFields);
                        }
                        return acc;
                    }, finalFields);
                }
                this.fieldsCache[definitionId] = { fields: finalFields, repetableStates };
            }
        }
        return this.fieldsCache[definitionId];
    }

    parse(story) {
        if (story === null) {
            return story;
        }

        const { theme = null, components = null } = story || {};
        if (theme === null || components === null) {
            return story;
        }

        const {
            components: themeComponents = [],
            background: themeBackground = null,
            colors: themeColors = {},
            textStyles: themeTextStyles = null,
            boxStyles: themeBoxStyles = null,
        } = theme;

        // Speed test
        // const newComponents = [...components];
        // for (let index = 0; index < components.length; index += 1) {
        //     const screen = components[index] || {};
        //     const { type } = screen;
        //     const { definition, themeScreen } = this.getDefinitionByScreen(type, themeComponents);
        //     const newScreen = this.parseScreen(
        //         definition,
        //         screen,
        //         themeScreen,
        //         themeBackground,
        //         themeColors,
        //         themeTextStyles,
        //         themeBoxStyles,
        //     );

        //     if (newScreen !== screen || themeScreen !== null) {
        //         newComponents[index] = {
        //             ...themeScreen,
        //             ...newScreen,
        //         };
        //     }
        // }
        // story.components = newComponents;
        // return story;

        const newComponents = components.reduce((currentComponents, screen, index) => {
            const { type } = screen;
            const { definition /* themeScreen */ } = this.getDefinitionByScreen(
                type,
                themeComponents,
            );
            const themeScreen = null;
            const newScreen = this.parseScreen(
                definition,
                screen,
                themeScreen,
                themeBackground,
                themeColors,
                themeTextStyles,
                themeBoxStyles,
            );

            // Only switch screen if it has changed
            return newScreen !== screen || themeScreen !== null
                ? [
                      ...currentComponents.slice(0, index),
                      {
                          ...themeScreen,
                          ...newScreen,
                      },
                      ...currentComponents.slice(index + 1),
                  ]
                : currentComponents;
        }, components);

        return newComponents !== components
            ? {
                  ...story,
                  components: newComponents,
              }
            : story;
    }

    parseScreen(
        definition,
        value,
        themeValue,
        themeBackground,
        themeColors,
        themeTextStyles,
        themeBoxStyles,
    ) {
        const { fields = null, repetableStates = null } = this.getFieldsForDefinition(definition);

        const newThemeValue = themeValue === null && themeBackground !== null ? {} : themeValue;

        if (themeBackground !== null && typeof newThemeValue.background !== 'undefined') {
            newThemeValue.background = {
                ...themeBackground,
                ...newThemeValue.background,
            };
        } else if (themeBackground !== null) {
            newThemeValue.background = themeBackground;
        }

        const newScreenValue = Object.keys(value).reduce((currentValue, key) => {
            let repetableState = null;
            if (repetableStates !== null && repetableStates.length > 0) {
                repetableState =
                    repetableStates.find(
                        ({ id: stateId = null }) => stateId !== null && stateId === key,
                    ) || null;
            }

            const fieldDefinition =
                (fields || null).find((it) => it.name === key) || repetableState || {};

            const fieldValue = value[key];
            const fieldThemeValue = newThemeValue !== null ? newThemeValue[key] || null : null;

            // Try for early return
            const { theme = null } = fieldDefinition || {};
            if ((theme === null || !isObject(theme)) && fields === null) {
                return {
                    ...currentValue,
                    [key]: fieldValue,
                };
            }

            // console.log('start', key, fieldValue);
            const newFieldValue = this.parseField(
                fieldValue,
                fieldDefinition,
                fieldThemeValue,
                themeColors,
                themeTextStyles,
                themeBoxStyles,
            );
            // console.log('result', newFieldValue);

            // const newFieldValue = fieldValue;

            // Only switch field if it has changed
            return newFieldValue !== fieldValue
                ? {
                      ...currentValue,
                      [key]: newFieldValue,
                  }
                : currentValue;
        }, value);

        return newThemeValue !== null
            ? {
                  ...newThemeValue,
                  ...newScreenValue,
              }
            : newScreenValue;
    }

    // eslint-disable-next-line class-methods-use-this
    parseField(value, fieldDefinition, themeValue, themeColors, themeTextStyles, themeBoxStyles) {
        const { theme: fieldTheme = null, fields: definitionFields = null } = fieldDefinition;

        // There are sub-fields in this definition
        if (definitionFields !== null && value !== null) {
            return isArray(value)
                ? value.map((innerFieldValue) => {
                      if (innerFieldValue === null) {
                          return innerFieldValue;
                      }
                      return this.parseInnerFields(
                          innerFieldValue,
                          definitionFields,
                          themeValue,
                          themeColors,
                          themeTextStyles,
                          themeBoxStyles,
                      );
                  })
                : this.parseInnerFields(
                      value,
                      definitionFields,
                      themeValue,
                      themeColors,
                      themeTextStyles,
                      themeBoxStyles,
                  );
        }

        // Early return
        if (fieldTheme === null || !isObject(fieldTheme)) {
            return value;
        }

        // @TODO very slooow...
        if (isArray(value)) {
            const newFieldValue = value.map((innerField) =>
                innerField !== null
                    ? Object.keys(innerField).reduce((newInnerField, innerFieldName) => {
                          // Early return
                          if (!isObject(innerField[innerFieldName])) {
                              return newInnerField;
                          }

                          const {
                              textStyle: innerFieldTextStyle = null,
                              color: innerFieldColor = null,
                              boxStyle: innerFieldBoxStyle = null,
                          } = fieldTheme[innerFieldName] || {};

                          // Early return, no theme
                          if (
                              innerFieldTextStyle === null &&
                              innerFieldColor === null &&
                              innerFieldBoxStyle === null
                          ) {
                              return newInnerField;
                          }

                          const {
                              textStyle: valueTextStyle = false,
                              boxStyle: valueBoxStyle = false,
                          } = innerField[innerFieldName] || {};

                          // Color
                          const colorValue =
                              innerFieldColor !== null
                                  ? {
                                        color:
                                            innerFieldColor !== null && themeColors !== null
                                                ? themeColors[innerFieldColor] || null
                                                : null,
                                    }
                                  : null;

                          // Text style
                          const textStyleValue =
                              innerFieldTextStyle !== null
                                  ? {
                                        textStyle:
                                            valueTextStyle !== false
                                                ? valueTextStyle
                                                : {
                                                      ...(innerFieldTextStyle !== null &&
                                                      themeTextStyles !== null
                                                          ? themeTextStyles[innerFieldTextStyle] ||
                                                            null
                                                          : null),
                                                      ...valueTextStyle,
                                                  },
                                    }
                                  : null;

                          const boxStyleValue =
                              innerFieldBoxStyle !== null
                                  ? {
                                        boxStyle:
                                            valueBoxStyle !== false
                                                ? valueBoxStyle
                                                : {
                                                      ...(innerFieldBoxStyle !== null &&
                                                      themeBoxStyles !== null
                                                          ? themeBoxStyles[innerFieldBoxStyle] ||
                                                            null
                                                          : null),
                                                      ...valueBoxStyle,
                                                  },
                                    }
                                  : null;

                          if (
                              colorValue === null &&
                              textStyleValue === null &&
                              boxStyleValue === null
                          ) {
                              return newInnerField;
                          }

                          return {
                              ...newInnerField,
                              [innerFieldName]: {
                                  ...colorValue,
                                  ...innerField[innerFieldName],
                                  ...textStyleValue,
                                  ...boxStyleValue,
                              },
                          };
                      }, innerField)
                    : innerField,
            );

            return newFieldValue;
        }

        if (isObject(value)) {
            return this.parseValue(
                value,
                fieldTheme,
                themeValue,
                themeColors,
                themeTextStyles,
                themeBoxStyles,
            );
        }

        return value;
    }

    parseInnerFields(
        value,
        fieldsOrDefinition,
        themeValue,
        themeColors,
        themeTextStyles,
        themeBoxStyles,
    ) {
        const newValue = Object.keys(value).reduce((finalValue, innerFieldName) => {
            const innerDefinition = isArray(fieldsOrDefinition)
                ? fieldsOrDefinition.find((it) => it.name === innerFieldName) || null
                : fieldsOrDefinition;
            const { theme: idfTheme = null } = innerDefinition || {};
            const innerValue = value[innerFieldName];

            // For items fields
            if (innerValue !== null && innerDefinition !== null && isArray(innerValue)) {
                // eslint-disable-next-line no-param-reassign
                finalValue[innerFieldName] = this.parseField(
                    innerValue,
                    innerDefinition,
                    themeValue,
                    themeColors,
                    themeTextStyles,
                    themeBoxStyles,
                );
                return finalValue;
            }

            // For fields with fields
            if (
                innerValue !== null &&
                idfTheme !== null &&
                isObject(idfTheme) &&
                isObject(innerValue)
            ) {
                // eslint-disable-next-line no-param-reassign
                finalValue[innerFieldName] = this.parseValue(
                    innerValue,
                    idfTheme,
                    themeValue,
                    themeColors,
                    themeTextStyles,
                    themeBoxStyles,
                );
                return finalValue;
            }

            // eslint-disable-next-line no-param-reassign
            finalValue[innerFieldName] = value[innerFieldName];
            return finalValue;
        }, {});
        return newValue;
    }

    // eslint-disable-next-line class-methods-use-this
    parseValue(initialValue, fieldTheme, themeValue, themeColors, themeTextStyles, themeBoxStyles) {
        if (isObject(initialValue) || isObject(fieldTheme)) {
            const value = initialValue || null;

            const {
                textStyle: fieldTextStyleName = null,
                color: fieldColorName = null,
                boxStyle: fieldBoxStyleName = null,
                ...otherProps
            } = fieldTheme || {};

            if (
                fieldTextStyleName === null &&
                fieldColorName === null &&
                fieldBoxStyleName === null &&
                isEmpty(otherProps) &&
                !isObject(fieldTheme)
            ) {
                return value;
            }

            let complexValue = null;

            if (!isEmpty(otherProps)) {
                complexValue = Object.keys(otherProps).reduce((newObject, key) => {
                    const innerValue = value !== null ? value[key] || null : null;
                    const newValue = this.parseValue(
                        innerValue,
                        otherProps[key],
                        themeValue,
                        themeColors,
                        themeTextStyles,
                        themeBoxStyles,
                    );
                    return { ...newObject, ...(newValue !== null ? { [key]: newValue } : null) };
                }, {});
            }

            const { textStyle: valueTextStyle = false, boxStyle: valueBoxStyle = false } =
                value || {};

            // Color
            const fieldColor =
                fieldColorName !== null && themeColors !== null
                    ? themeColors[fieldColorName] || null
                    : null;

            const colorValue =
                fieldColor !== null
                    ? {
                          color: fieldColor,
                      }
                    : null;

            // Text style
            const fieldTextStyle =
                fieldTextStyleName !== null && themeTextStyles !== null
                    ? themeTextStyles[fieldTextStyleName] || null
                    : null;

            const fieldThemeComponentTextStyle =
                themeValue !== null ? themeValue.textStyle || null : null;

            const textStyleValue =
                fieldTextStyle !== null || fieldThemeComponentTextStyle !== null
                    ? {
                          textStyle:
                              valueTextStyle !== false
                                  ? valueTextStyle
                                  : {
                                        ...fieldTextStyle,
                                        ...fieldThemeComponentTextStyle,
                                        ...(valueTextStyle || null),
                                    },
                      }
                    : null;

            // Box style
            const fieldBoxStyle =
                fieldBoxStyleName !== null && themeBoxStyles !== null
                    ? themeBoxStyles[fieldBoxStyleName] || null
                    : null;

            const fieldThemeComponentBoxStyle =
                themeValue !== null ? themeValue.boxStyle || null : null;

            const boxStyleValue =
                fieldBoxStyle !== null || fieldThemeComponentBoxStyle !== null
                    ? {
                          boxStyle:
                              valueBoxStyle !== false
                                  ? valueBoxStyle
                                  : {
                                        ...fieldBoxStyle,
                                        ...fieldThemeComponentBoxStyle,
                                        ...(valueBoxStyle || null),
                                    },
                      }
                    : null;

            // Only change value if something is overrided
            return colorValue !== null ||
                themeValue !== null ||
                textStyleValue !== null ||
                boxStyleValue !== null ||
                complexValue !== null
                ? {
                      ...colorValue,
                      ...themeValue,
                      ...value,
                      ...boxStyleValue,
                      ...textStyleValue,
                      ...complexValue,
                  }
                : value;
        }

        return initialValue;
    }
}

export default ThemeParser;
