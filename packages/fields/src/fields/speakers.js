import { defineMessage } from 'react-intl';
import { v1 as uuid } from 'uuid';

export default {
    id: 'speakers',
    component: 'items',
    getDefaultValue: () => ({ id: uuid(), side: 'left' }),
    noItemLabel: defineMessage({
        defaultMessage: 'No speaker...',
        description: 'Label when there is no item',
    }),
    addItemLabel: defineMessage({
        defaultMessage: 'Add a speaker',
        description: 'Button label',
    }),
    itemsField: {
        type: 'speaker',
        breadcrumbLabel: defineMessage({
            defaultMessage: 'Speaker',
            description: 'Breadcrumb field label',
        }),
    },
};
