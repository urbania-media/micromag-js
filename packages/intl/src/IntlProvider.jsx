import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { IntlProvider as BaseIntlProvider } from 'react-intl';

import IntlManager from './IntlManager';
import defaultManager from './manager';

const propTypes = {
    intlManager: PropTypes.instanceOf(IntlManager),
    locale: PropTypes.string,
    children: PropTypes.node,
};

const defaultProps = {
    intlManager: defaultManager,
    locale: null,
    children: null,
};

const IntlProvider = ({ intlManager, locale, children }) => {
    const messages = useMemo(() => {
        const currentMessages = intlManager.getMessages(locale);
        if (process.env.NODE_ENV === 'development') {
            if (currentMessages === null) {
                console.warn(`IntlProvider: ${locale} is not added.`);
            }
        }
        return currentMessages;
    }, [locale]);
    return (
        <BaseIntlProvider locale={locale} messages={messages}>
            {children}
        </BaseIntlProvider>
    );
};

IntlProvider.propTypes = propTypes;
IntlProvider.defaultProps = defaultProps;

export default IntlProvider;
