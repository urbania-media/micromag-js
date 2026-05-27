import { ReactNode, createContext, use, useMemo } from 'react';
import { IntlProvider as BaseIntlProvider, IntlConfig, IntlContext } from 'react-intl';

import IntlManager from './IntlManager';
import defaultManager from './manager';

const defaultLocales = ['en', 'fr'];

export const LocalesContext = createContext(defaultLocales);

export const useLocales = () => use(LocalesContext);

export const useOtherLocales = () => {
    const locales = useLocales();
    const { locale } = use(IntlContext);
    const otherLocales = useMemo(() => locales.filter((it) => it !== locale), [locales, locale]);
    return otherLocales;
};

interface IntlProviderProps extends Omit<IntlConfig, 'locale'> {
    intlManager?: IntlManager;
    locale?: string;
    locales?: string[];
    extraMessages?: Record<string, string>;
    children?: ReactNode;
}

export function IntlProvider({
    intlManager = defaultManager,
    locale = null,
    locales = null,
    children = null,
    extraMessages = null,
    ...props
}: IntlProviderProps) {
    const previousLocales = useLocales();
    const { locale: previousLocale = null, messages: previousMessages = null } =
        use(IntlContext) || {};
    const currentMessages = intlManager.getMessages(locale);
    if (process.env.NODE_ENV === 'development') {
        if (currentMessages === null) {
            console.warn(`IntlProvider: ${locale} is not added.`);
        }
    }
    const messages = {
        ...currentMessages,
        ...extraMessages,
        ...(previousLocale === locale ? previousMessages : null),
    };
    const onError = (err) => {
        if (err.code === 'MISSING_TRANSLATION') {
            return;
        }
        console.error(err);
    };

    return (
        <BaseIntlProvider {...props} locale={locale} messages={messages} onError={onError}>
            <LocalesContext value={locales || previousLocales}>{children}</LocalesContext>
        </BaseIntlProvider>
    );
}
