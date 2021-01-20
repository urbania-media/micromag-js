import { useCallback } from 'react';
import isObject from 'lodash/isObject';
import isArray from 'lodash/isArray';

import { useScreensManager } from '../contexts';

const useThemeParser = () => {
    const screensManager = useScreensManager();
    const parse = useCallback(
        (story) => {
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
                const { fields = [] } = screensManager.getDefinition(type) || {};
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
                        const {
                            type: fieldType,
                            theme: {
                                textStyle: fieldTextStyle = null,
                                textColor: fieldTextColor = null,
                                color: fieldColor = null,
                            } = {},
                        } = fields.find((it) => it.name === key) || {};
                        const fieldValue = screen[key];
                        let newFieldValue = fieldValue;
                        if (fieldValue !== null && fieldType === 'text-element') {
                            newFieldValue = {
                                color: fieldColor !== null ? themeColors[fieldColor] || null : null,
                                ...themeComponent[key],
                                ...fieldValue,
                                textStyle: {
                                    color:
                                        fieldTextColor !== null
                                            ? themeColors[fieldTextColor] || null
                                            : null,
                                    ...(fieldTextStyle !== null && themeTextSyle !== null
                                        ? themeTextSyle[fieldTextStyle] || null
                                        : null),
                                    ...((themeComponent[key] || {}).textStyle || null),
                                    ...(fieldValue.textStyle || null),
                                },
                            };
                        } else if (isObject(fieldValue) && !isArray(fieldValue)) {
                            newFieldValue = {
                                ...themeComponent[key],
                                ...fieldValue,
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
        },
        [screensManager],
    );
    return parse;
};

export default useThemeParser;
