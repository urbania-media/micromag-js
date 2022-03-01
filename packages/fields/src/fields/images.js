import { defineMessage } from 'react-intl';

export default {
    id: 'images',
    component: 'images',
    itemsField:{
        type: 'image',
        breadcrumbLabel: defineMessage({
            defaultMessage: 'Image',
            description: 'Breadcrumb field label',
        }),
    }
};
