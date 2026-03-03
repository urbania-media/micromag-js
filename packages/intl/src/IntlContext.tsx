import React, { useCallback, useContext, useMemo } from 'react';
import { IntlProvider as BaseIntlProvider, IntlContext } from 'react-intl';

import IntlManager from './IntlManager';
import defaultManager from './manager';

const defaultLocales = ['en', 'fr'];

export const LocalesContext = React.createContext(defaultLocales);

export const useLocales = () => useContext(LocalesContext);

export const useOtherLocales = () => {
    const locales = useLocales();
    const { locale } = useContext(IntlContext);
    const otherLocales = useMemo(() => locales.filter((it) => it !== locale), [locales, locale]);
    return otherLocales;
};

interface IntlProviderProps {
    intlManager?: IntlManager;
    locale?: string;
    locales?: string[];
    extraMessages?: Record<string, string>;
    children?: React.ReactNode;
}

export function IntlProvider({
    intlManager = defaultManager,
    locale = null,
    locales = null,
    children = null,
    extraMessages = null,
}) {
    const previousLocales = useLocales();
    const { locale: previousLocale = null, messages: previousMessages = null } =
        useContext(IntlContext) || {};
    const messages = useMemo(() => {
        const currentMessages = intlManager.getMessages(locale);
        if (process.env.NODE_ENV === 'development') {
            if (currentMessages === null) {
                console.warn(`IntlProvider: ${locale} is not added.`);
            }
        }
        return {
            ...currentMessages,
            ...extraMessages,
            ...(previousLocale === locale ? previousMessages : null),
        };
    }, [locale, previousLocale, previousMessages, extraMessages]);
    const onError = useCallback((err) => {
        if (err.code === 'MISSING_TRANSLATION') {
            return;
        }
        console.error(err);
    }, []);

    return (
        <BaseIntlProvider locale={locale} messages={messages} onError={onError}>
            <LocalesContext.Provider value={locales || previousLocales}>
                {children}
            </LocalesContext.Provider>
        </BaseIntlProvider>
    );
}
