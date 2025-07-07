import { defineMessage } from 'react-intl';

export default {
    id: 'game-sort-items',
    component: 'items',
    noItemLabel: defineMessage({
        defaultMessage: 'No item yet',
        description: 'Label when there is no item',
    }),
    addItemLabel: defineMessage({
        defaultMessage: 'Add an item',
        description: 'Button label',
    }),
    itemsField: {
        type: 'game-sort-item',
        breadcrumbLabel: defineMessage({
            defaultMessage: 'Item',
            description: 'Breadcrumb field label',
        }),
    },
};
