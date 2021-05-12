import { defineMessage } from 'react-intl';
import { v1 as uuid } from 'uuid';

import Items from '../components/Items';

export default {
    id: 'speakers',
    component: Items,
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
            description: 'Speakers field label',
        }),
    },
};
