import isObject from 'lodash/isObject';
import React from 'react';
import { IntlProvider } from 'react-intl';

import '../../packages/intl/locale/en';
import '../../packages/intl/locale/fr';

import messagesEn from '../../packages/intl/locale/en.json';
import messagesFr from '../../packages/intl/locale/fr.json';

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
