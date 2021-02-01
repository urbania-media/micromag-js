import isObject from 'lodash/isObject';
import isArray from 'lodash/isArray';

class ThemeParser {
    constructor({ screensManager }) {
        this.screensManager = screensManager;
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
            colors: themeColors = {},
            background: themeBackground = null,
            textStyle: themeTextSyle = null,
        } = theme;
        const newComponents = components.map((screen) => {
            const { type } = screen;
            const { fields = [] } = this.screensManager.getDefinition(type) || {};
            const { type: themeComponentType, ...themeComponentFields } =
                themeComponents.find((it) => it.type === type) || {};
            const themeComponent = {
                ...themeComponentFields,
            };
            if (typeof themeComponent.background !== 'undefined' && themeBackground !== null) {
                themeComponent.background = {
                    ...themeBackground,
                    ...themeComponent.background,
                };
            } else if (themeBackground !== null) {
                themeComponent.background = themeBackground;
            }
            return {
                ...themeComponent,
                ...Object.keys(screen).reduce((newScreen, key) => {
                    // The theme values
                    const { theme: fullTheme = {} } = fields.find((it) => it.name === key) || {};
                    const fieldValue = screen[key];
                    let newFieldValue = fieldValue;

                    if (isArray(fieldValue)) {
                        newFieldValue = newFieldValue.map((innerField) =>
                            innerField !== null
                                ? Object.keys(innerField).reduce(
                                      (newInnerField, innerFieldName) => {
                                          const {
                                              textStyle: innerFieldTextStyle = null,
                                              color: innerFieldColor = null,
                                          } = fullTheme[innerFieldName] || {};

                                          const colorValue =
                                              innerFieldColor !== null
                                                  ? {
                                                        color:
                                                            innerFieldColor !== null &&
                                                            themeColors !== null
                                                                ? themeColors[innerFieldColor] ||
                                                                  null
                                                                : null,
                                                    }
                                                  : null;
                                          const textStyleValue =
                                              innerFieldTextStyle !== null
                                                  ? {
                                                        textStyle: {
                                                            ...(innerFieldTextStyle !== null &&
                                                            themeTextSyle !== null
                                                                ? themeTextSyle[
                                                                      innerFieldTextStyle
                                                                  ] || null
                                                                : null),
                                                            ...(innerField[innerFieldName]
                                                                .textStyle || null),
                                                        },
                                                    }
                                                  : null;

                                          return {
                                              ...newInnerField,
                                              [innerFieldName]: {
                                                  ...colorValue,
                                                  ...innerField[innerFieldName],
                                                  ...textStyleValue,
                                              },
                                          };
                                      },
                                      {},
                                  )
                                : innerField,
                        );
                    }
                    if (isObject(fieldValue) && !isArray(fieldValue)) {
                        const { textStyle: fieldTextStyle = null, color: fieldColor = null } =
                            fullTheme || {};
                        const colorValue =
                            fieldColor !== null
                                ? {
                                      color:
                                          fieldColor !== null && themeColors !== null
                                              ? themeColors[fieldColor] || null
                                              : null,
                                  }
                                : null;
                        const textStyleValue =
                            fieldTextStyle !== null
                                ? {
                                      textStyle: {
                                          ...(fieldTextStyle !== null && themeTextSyle !== null
                                              ? themeTextSyle[fieldTextStyle] || null
                                              : null),
                                          ...((themeComponent[key] || {}).textStyle || null),
                                          ...(fieldValue.textStyle || null),
                                      },
                                  }
                                : null;
                        newFieldValue = {
                            ...colorValue,
                            ...themeComponent[key],
                            ...fieldValue,
                            ...textStyleValue,
                        };
                    }
                    return {
                        ...newScreen,
                        [key]: newFieldValue,
                    };
                }, {}),
            };
        });

        return {
            ...story,
            components: newComponents,
        };
    }
}

export default ThemeParser;
