import { useMemo } from 'react';

const useThemeValue = (value, isTheme = false) => {
    const valueWithTheme = useMemo(() => {
        if (!isTheme) {
            return value;
        }
        const { components, ...themeValue } = value || {};
        return value !== null ? {
            theme: themeValue,
            ...value,
        } : value;
    }, [value, isTheme]);
    return valueWithTheme;
};

export default useThemeValue;
