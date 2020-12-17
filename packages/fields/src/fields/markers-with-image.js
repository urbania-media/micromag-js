import { defineMessage } from 'react-intl';
import Items from '../components/Items';

export default {
    id: 'markers-with-image',
    component: Items,
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
    }
};
