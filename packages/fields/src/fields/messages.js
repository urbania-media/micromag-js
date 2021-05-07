import { defineMessage } from 'react-intl';

import Items from '../components/Items';

export default {
    id: 'messages',
    component: Items,
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
            description: 'Messages field label',
        }),
    },
};
