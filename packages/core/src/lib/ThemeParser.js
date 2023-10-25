import isArray from 'lodash/isArray';
import isEmpty from 'lodash/isEmpty';
import isObject from 'lodash/isObject';

class ThemeParser {
    constructor({ screensManager }) {
        this.screensManager = screensManager;
        this.definitionCache = {};
    }

    getDefinitionByScreen(type, themeComponents) {
        if (typeof this.definitionCache[type] === 'undefined') {
            const definition = this.screensManager.getDefinition(type) || {};
            const themeScreen = themeComponents.find((it) => it.type === type) || null;
            this.definitionCache[type] = { definition, themeScreen };
        }
        return this.definitionCache[type];
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

        const newComponents = components.reduce((currentComponents, screen, index) => {
            const { type } = screen;
            const { definition, themeScreen } = this.getDefinitionByScreen(type, themeComponents);
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
        const { fields = [], states = [] } = definition || {};

        // TODO: test this
        let finalFields = fields;
        let repetableStates = [];
        if (states !== null && states.length > 0) {
            const nonRepetableStates = states.filter(
                ({ repeatable = false }) => repeatable === false,
            );
            repetableStates = states.filter(({ repeatable = false }) => repeatable === true);
            finalFields = nonRepetableStates.reduce((acc, it) => {
                const { fields: itemFields = [] } = it || {};
                if (itemFields !== null && itemFields.length > 0) {
                    return acc.concat(itemFields);
                }
                return acc;
            }, finalFields);
        }

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
            if (repetableStates.length > 0) {
                repetableState =
                    repetableStates.find(
                        ({ id: stateId = null }) => stateId !== null && stateId === key,
                    ) || null;
            }

            const fieldDefinition =
                finalFields.find((it) => it.name === key) || repetableState || {};

            const fieldValue = value[key];
            const fieldThemeValue = newThemeValue !== null ? newThemeValue[key] || null : null;

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
    parseField(value, definition, themeValue, themeColors, themeTextStyles, themeBoxStyles) {
        const { theme: fieldTheme = null, fields: definitionFields = null } = definition;

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
                                        textStyle: {
                                            ...(innerFieldTextStyle !== null &&
                                            themeTextStyles !== null
                                                ? themeTextStyles[innerFieldTextStyle] || null
                                                : null),
                                            ...(innerField[innerFieldName].textStyle || null),
                                        },
                                    }
                                  : null;

                          const boxStyleValue =
                              innerFieldBoxStyle !== null
                                  ? {
                                        boxStyle: {
                                            ...(innerFieldBoxStyle !== null &&
                                            themeBoxStyles !== null
                                                ? themeBoxStyles[innerFieldBoxStyle] || null
                                                : null),
                                            ...(innerField[innerFieldName].boxStyle || null),
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

            const { textStyle: valueTextStyle = null, boxStyle: valueBoxStyle = null } =
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
                          textStyle: {
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
                          boxStyle: {
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
