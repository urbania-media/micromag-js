import { defineMessage } from 'react-intl';

import Images from '../components/Images';

export default {
    id: 'images',
    component: Images,
    itemsField:{
        type: 'image',
        breadcrumbLabel: defineMessage({
            defaultMessage: 'Image',
            description: 'Images item field label',
        }),
    }
};
