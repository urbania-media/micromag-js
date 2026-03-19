import React, { use, useCallback, useMemo } from 'react';
import { IntlProvider as BaseIntlProvider, IntlContext } from 'react-intl';

import IntlManager from './IntlManager';
import defaultManager from './manager';

const defaultLocales = ['en', 'fr'];

export const LocalesContext = React.createContext(defaultLocales);

export const useLocales = () => use(LocalesContext);

export const useOtherLocales = () => {
    const locales = useLocales();
    const { locale } = use(IntlContext);
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
}: IntlProviderProps) {
    const previousLocales = useLocales();
    const { locale: previousLocale = null, messages: previousMessages = null } =
        use(IntlContext) || {};
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
            <LocalesContext value={locales || previousLocales}>{children}</LocalesContext>
        </BaseIntlProvider>
    );
}
