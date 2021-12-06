import { defineMessage } from 'react-intl';

export default {
    id: 'markers-with-image',
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
        type: 'marker-with-image',
        breadcrumbLabel: defineMessage({
            defaultMessage: 'Marker',
            description: 'Markers with image item field label',
        }),
    },
};
