import isObject from 'lodash-es/isObject';
import { IntlProvider } from 'react-intl';

import { IntlProvider as PanneauIntlProvider } from '@panneau/intl';
import '@panneau/intl/locale/fr';
import panneauMessages from '@panneau/intl/locale/fr.json';

import '../../packages/intl/locale/en';
import '../../packages/intl/locale/fr';

import messagesEn from '../../packages/intl/locale/en.json';
import messagesFr from '../../packages/intl/locale/fr.json';

const onIntlError = (err) => {
    if (err.code === 'MISSING_TRANSLATION') {
        return;
    }
    console.error(err);
};

const withIntlProvider = (Story, { parameters: { intl = true } }) => {
    const enabled = isObject(intl) || intl === true;
    const { locale = 'fr', messages = null } = isObject(intl) ? intl : {};

    const partialMessages = locale === 'fr' ? messagesFr : messagesEn;
    const customMessages = messages === null ? partialMessages : null;

    // console.log('Intl', locale);

    return enabled ? (
        <PanneauIntlProvider locale={locale}>
            <IntlProvider
                locale={locale}
                messages={{ ...customMessages, ...panneauMessages }}
                onError={onIntlError}
            >
                <Story />
            </IntlProvider>
        </PanneauIntlProvider>
    ) : (
        <Story />
    );
};

export default withIntlProvider;
