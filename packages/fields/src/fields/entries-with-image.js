import { defineMessage } from 'react-intl';

import entries from './entries';

export default {
    ...entries,
    id: 'entries-with-image',
    itemsField: {
        type: 'entry-with-image',
        breadcrumbLabel: defineMessage({
            defaultMessage: 'Entry',
            description: 'Breadcrumb field label',
        }),
    },
};
