import { useMemo } from 'react';
import isObject from 'lodash/isObject';
import isArray from 'lodash/isArray';
import { useScreensManager } from '../contexts/ScreensContext';

const useScreensWithTheme = (components, theme = null) => {
    const screensManager = useScreensManager();
    const screens = useMemo(() => {
        if (theme === null) {
            return components;
        }
        const {
            components: themeComponents = [],
            background: themeBackground = null,
            textStyle: themeTextSyle = null,
        } = theme;
        return components.map((screen) => {
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
                    const { type: fieldType, textStyle: fieldTextStyle = null } =
                        fields.find((it) => it.name === key) || {};
                    const fieldValue = screen[key];
                    let newFieldValue = fieldValue;
                    if (fieldValue !== null && fieldType === 'text-element') {
                        newFieldValue = {
                            ...themeComponent[key],
                            ...fieldValue,
                            textStyle: {
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
    }, [screensManager, components, theme]);
    return screens;
};

export default useScreensWithTheme;
