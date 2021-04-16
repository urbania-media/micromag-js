import { defineMessage } from 'react-intl';

import Items from '../components/Items';

export default {
    id: 'visuals-with-caption',
    component: Items,
    noItemLabel: defineMessage({
        defaultMessage: 'No visual...',
        description: 'Label when there is no item',
    }),
    addItemLabel: defineMessage({
        defaultMessage: 'Add a visual',
        description: 'Button label',
    }),
    itemsField: {
        type: 'visual-with-caption',
        breadcrumbLabel: defineMessage({
            defaultMessage: 'Visual',
            description: 'Visuals with caption item field label',
        }),
    },
};
