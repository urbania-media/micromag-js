import { defineMessage } from 'react-intl';

export default {
    id: 'entries',
    component: 'items',
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
