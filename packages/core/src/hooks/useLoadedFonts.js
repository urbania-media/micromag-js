import isObject from 'lodash/isObject';
import { useState, useEffect } from 'react';

const fontsMap = {
    loading: [],
    active: [],
};

const isFontLoading = (name) => fontsMap.loading.indexOf(name) !== -1;
const isFontActive = (name) => fontsMap.active.indexOf(name) !== -1;
const addFontLoading = (name) => {
    fontsMap.active = fontsMap.active.filter((it) => it !== name);
    fontsMap.loading = [...fontsMap.loading, name];
};
const removeFontLoading = (name) => {
    fontsMap.loading = fontsMap.loading.filter((it) => it !== name);
};
const addFontActive = (name) => {
    fontsMap.loading = fontsMap.loading.filter((it) => it !== name);
    fontsMap.active = [...fontsMap.active, name];
};

const useLoadedFonts = (fonts) => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const config = fonts.reduce((newConfig, font) => {
            const {
                type,
                name,
                variants = [],
            } = isObject(font)
                ? font
                : {
                      type: 'system',
                      name: font,
                  };

            if (
                (type === 'google' || type === 'custom') &&
                !isFontLoading(name) &&
                !isFontActive(name)
            ) {
                return {
                    ...newConfig,
                    [type]: {
                        families: [
                            ...(newConfig !== null ? (newConfig[type] || {}).families || [] : []),
                            type === 'google'
                                ? [name, (variants || []).filter((it) => it !== null).join(',')]
                                      .filter((it) => it !== null && it.length > 0)
                                      .join(':')
                                : [
                                      name,
                                      (variants !== null ? [{fvd: 'n4'}, ...variants] : [])
                                          .map(
                                              ({ fvd = null, weight = null, style = null }) =>
                                                  fvd ||
                                                  [style, weight]
                                                      .filter((it) => it !== null)
                                                      .map((it) => `${it}`.substr(0, 1))
                                                      .join(''),
                                          )
                                          .filter((it) => it !== null && it.length > 0)
                                          .join(','),
                                  ]
                                      .filter((it) => it !== null && it.length > 0)
                                      .join(':'),
                        ],
                    },
                };
            }
            return newConfig;
        }, null);

        const hasConfig = config !== null;

        if (hasConfig && typeof window !== 'undefined') {
            import('webfontloader').then(({ default: WebFont }) =>
                WebFont.load({
                    ...config,
                    timeout: 3000,
                    active: () => setLoaded(true),
                    fontloading: (name) => addFontLoading(name),
                    fontactive: (name) => addFontActive(name),
                    fontinactive: (name) => removeFontLoading(name),
                }),
            );
        } else {
            setLoaded(true);
        }
    }, [fonts, setLoaded]);
    return { loaded };
};

export default useLoadedFonts;
