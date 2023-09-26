import isObject from 'lodash/isObject';
import React from 'react';
import { IntlProvider } from 'react-intl';

import '../../packages/intl/lang/en';
import '../../packages/intl/lang/fr';

import messagesEn from '../../packages/intl/lang/en.json';
import messagesFr from '../../packages/intl/lang/fr.json';

const withIntlProvider = (Story, { parameters: { intl = null } }) => {
    const enabled = isObject(intl) || intl === true;
    const { locale = 'fr', messages = null } = isObject(intl) ? intl : {};

    const partialMessages = locale === 'fr' ? messagesFr : messagesEn;
    const customMessages = messages === null ? partialMessages : null;

    // console.log('Intl', locale);

    return enabled ? (
        <IntlProvider locale={locale} messages={customMessages}>
            <Story />
        </IntlProvider>
    ) : (
        <Story />
    );
};

export default withIntlProvider;
