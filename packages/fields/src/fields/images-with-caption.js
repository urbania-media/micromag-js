import { defineMessage } from 'react-intl';

import Items from '../components/Items';

export default {
    id: 'images-with-caption',
    component: Items,
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
            description: 'Images with caption item field label',
        }),
    },
};
