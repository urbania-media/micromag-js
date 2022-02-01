import { defineMessage } from 'react-intl';

export default {
    id: 'slides',
    component: 'items',
    noItemLabel: defineMessage({
        defaultMessage: 'No slide...',
        description: 'Label when there is no item',
    }),
    addItemLabel: defineMessage({
        defaultMessage: 'Add a slide',
        description: 'Button label',
    }),
    itemsField: {
        type: 'slide',
        breadcrumbLabel: defineMessage({
            defaultMessage: 'Slide',
            description: 'Slides with heading and image with caption',
        }),
    },
};
