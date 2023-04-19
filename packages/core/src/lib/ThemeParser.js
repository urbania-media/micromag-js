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
        const { fields = [] } = definition;

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
            const fieldDefinition = fields.find((it) => it.name === key) || {};
            const fieldValue = value[key];
            const fieldThemeValue = newThemeValue !== null ? newThemeValue[key] || null : null;
            const newFieldValue = this.parseField(
                key,
                fieldDefinition,
                fieldValue,
                fieldThemeValue,
                themeColors,
                themeTextStyles,
                themeBoxStyles,
            );

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
    parseField(key, definition, value, themeValue, themeColors, themeTextStyles, themeBoxStyles) {
        const { theme: fieldTheme = null } = definition;
        // console.log('fieldTheme', id, fieldTheme);

        // Early return
        if (fieldTheme === null || !isObject(fieldTheme)) {
            return value;
        }

        // @TODO very sloow
        if (isArray(value)) {
            const newFieldValue = value.map((innerField) =>
                innerField !== null
                    ? Object.keys(innerField).reduce((newInnerField, innerFieldName) => {
                          // console.log('innerField', innerField);
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

                          // TODO: replace this with the recursive parseValue...

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

            // console.log('hell', boxStyleValue, complexValue);

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
