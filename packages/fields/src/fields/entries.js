import { defineMessage } from 'react-intl';

import Items from '../components/Items';

export default {
    id: 'entries',
    component: Items,
    noItemLabel: defineMessage({
        defaultMessage: 'No entry...',
        description: 'Label when there is no item',
    }),
    addItemLabel: defineMessage({
        defaultMessage: 'Add an entry',
        description: 'Button label',
    }),
    itemsField: {
        type: 'entry',
        breadcrumbLabel: defineMessage({
            defaultMessage: 'Entry',
            description: 'Entries item field label',
        }),
    },
};
