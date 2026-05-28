/* eslint-disable */
import panneauMessages from '@panneau/intl/locale/REPLACE_LOCALE.json';

import manager from '@micromag/intl';

import messages from '../locale/REPLACE_LOCALE.json';

manager.addLocale('REPLACE_LOCALE', {
    ...panneauMessages,
    ...messages,
});
