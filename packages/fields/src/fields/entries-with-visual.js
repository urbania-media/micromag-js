import { defineMessage } from 'react-intl';

import entries from './entries';

export default {
    ...entries,
    id: 'entries-with-visual',
    itemsField: {
        type: 'entry-with-visual',
        breadcrumbLabel: defineMessage({
            defaultMessage: 'Entry',
            description: 'Entries item field label',
        }),
    },
};
