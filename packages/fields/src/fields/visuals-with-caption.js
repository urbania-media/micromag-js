import { defineMessage } from 'react-intl';

export default {
    id: 'visuals-with-caption',
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
        type: 'visual-with-caption',
        breadcrumbLabel: defineMessage({
            defaultMessage: 'Image',
            description: 'Images with caption item field label',
        }),
    },
};
