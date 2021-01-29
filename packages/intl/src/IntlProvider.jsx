import React, { useMemo, useContext } from 'react';
import PropTypes from 'prop-types';
import { IntlProvider as BaseIntlProvider, IntlContext } from 'react-intl';

import IntlManager from './IntlManager';
import defaultManager from './manager';

const propTypes = {
    intlManager: PropTypes.instanceOf(IntlManager),
    locale: PropTypes.string,
    extraMessages: PropTypes.objectOf(PropTypes.string),
    children: PropTypes.node,
};

const defaultProps = {
    intlManager: defaultManager,
    locale: null,
    extraMessages: null,
    children: null,
};

const IntlProvider = ({ intlManager, locale, children, extraMessages }) => {
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
    return (
        <BaseIntlProvider locale={locale} messages={messages}>
            {children}
        </BaseIntlProvider>
    );
};

IntlProvider.propTypes = propTypes;
IntlProvider.defaultProps = defaultProps;

export default IntlProvider;
