import { defineMessage } from 'react-intl';

import entries from './entries';

export default {
    ...entries,
    id: 'share-options',
    itemsField: {
        type: 'share-option',
        breadcrumbLabel: defineMessage({
            defaultMessage: 'Share option',
            description: 'Breadcrumb field label',
        }),
    },
};
