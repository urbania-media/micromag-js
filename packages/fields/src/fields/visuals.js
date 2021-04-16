import { defineMessage } from 'react-intl';

import Visuals from '../components/Visuals';

export default {
    id: 'visuals',
    component: Visuals,
    itemsField:{
        type: 'visual',
        breadcrumbLabel: defineMessage({
            defaultMessage: 'Visual',
            description: 'Visuals item field label',
        }),
    }
};
