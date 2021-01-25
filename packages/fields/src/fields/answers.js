import { defineMessage } from 'react-intl';

import Items from '../components/Items';

export default {
    id: 'answers',
    component: Items,
    noItemLabel: defineMessage({
        defaultMessage: 'No answer...',
        description: 'Label when there is no item',
    }),
    addItemLabel: defineMessage({
        defaultMessage: 'Add an answer',
        description: 'Button label',
    }),
    itemsField: {
        type: 'answer',
    },
};
