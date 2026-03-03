import { defineMessage } from 'react-intl';

export default {
    id: 'buttons',
    component: 'items',
    noItemLabel: defineMessage({
        defaultMessage: 'No button yet',
        description: 'Label when there is no item',
    }),
    addItemLabel: defineMessage({
        defaultMessage: 'Add a button',
        description: 'Button label',
    }),
    itemsField: {
        type: 'button',
        breadcrumbLabel: defineMessage({
            defaultMessage: 'Button',
            description: 'Breadcrumb field label',
        }),
    },
};
