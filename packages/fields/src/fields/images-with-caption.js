import { defineMessage } from 'react-intl';
import Items from '../components/Items';

export default {
    id: 'images-with-caption',
    component: Items,
    noItemLabel: defineMessage({
        defaultMessage: 'No image...',
        description: 'Label when there is no item in images field',
    }),
    addItemLabel: defineMessage({
        defaultMessage: 'Add an image',
        description: 'Button label in images field',
    }),
    itemsField: {
        type: 'image-with-caption',
    },
};
