import { useState, useEffect } from 'react';

/**
 * Locale loader
 */
const localesCache = {};
const defaultLocalesMap = {
    fr: () => import('@uppy/locales/lib/fr_FR'),
    en: () => import('@uppy/locales/lib/en_US'),
};
const useUppyLocale = (locale, { localesMap = defaultLocalesMap } = {}) => {
    // locale
    const [loadedLocale, setLoadedLocale] = useState(localesCache[locale] || null);
    useEffect(() => {
        let canceled = false;
        if (loadedLocale !== null) {
            return () => {
                canceled = true;
            };
        }
        (localesMap[locale] || locale)().then(
            ({ default: localeObj }) => {
                localesCache[locale] = localeObj;
                if (!canceled) {
                    setLoadedLocale(localeObj);
                }
            },
        );
        return () => {
            canceled = true;
        };
    }, [localesMap, locale, loadedLocale, setLoadedLocale]);
    return loadedLocale;
};

export default useUppyLocale;
