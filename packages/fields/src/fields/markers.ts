import { defineMessage } from 'react-intl';

export default {
    id: 'markers',
    component: 'items',
    noItemLabel: defineMessage({
        defaultMessage: 'No marker...',
        description: 'Label when there is no item',
    }),
    addItemLabel: defineMessage({
        defaultMessage: 'Add a marker',
        description: 'Button label',
    }),
    itemsField: {
        type: 'marker',
        breadcrumbLabel: defineMessage({
            defaultMessage: 'Marker',
            description: 'Breadcrumb field label',
        }),
    }
};
