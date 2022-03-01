import { defineMessage } from 'react-intl';

export default {
    id: 'images-with-caption',
    component: 'items',
    noItemLabel: defineMessage({
        defaultMessage: 'No image...',
        description: 'Label when there is no item',
    }),
    addItemLabel: defineMessage({
        defaultMessage: 'Add an image',
        description: 'Button label',
    }),
    itemsField: {
        type: 'image-with-caption',
        breadcrumbLabel: defineMessage({
            defaultMessage: 'Image',
            description: 'Breadcrumb field label',
        }),
    },
};
