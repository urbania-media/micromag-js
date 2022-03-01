import { defineMessage } from 'react-intl';

export default {
    id: 'visuals',
    component: 'visuals',
    itemsField:{
        type: 'visual',
        breadcrumbLabel: defineMessage({
            defaultMessage: 'Image',
            description: 'Breadcrumb field label',
        }),
    }
};
