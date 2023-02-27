import isObject from 'lodash/isObject';
import React from 'react';
import { IntlProvider } from 'react-intl';

import '../../packages/intl/locale/en';
import '../../packages/intl/locale/fr';

const withIntlProvider = (Story, { parameters: { intl = null } }) => {
    const enabled = isObject(intl) || intl === true;
    console.log(intl);
    const { locale = 'en', messages = {} } = isObject(intl) ? intl : {};
    return enabled ? (
        <IntlProvider locale={locale} messages={messages}>
            <Story />
        </IntlProvider>
    ) : (
        <Story />
    );
};

export default withIntlProvider;
