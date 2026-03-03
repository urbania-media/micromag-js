import { defineMessage } from 'react-intl';

export default {
    id: 'messages',
    component: 'items',
    noItemLabel: defineMessage({
        defaultMessage: 'No message...',
        description: 'Label when there is no item',
    }),
    addItemLabel: defineMessage({
        defaultMessage: 'Add a message',
        description: 'Button label',
    }),
    itemsField: {
        type: 'message',
        breadcrumbLabel: defineMessage({
            defaultMessage: 'Message',
            description: 'Breadcrumb field label',
        }),
    },
};
