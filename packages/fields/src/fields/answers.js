import { defineMessage } from 'react-intl';

export default {
    id: 'answers',
    component: 'items',
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
        breadcrumbLabel: defineMessage({
            defaultMessage: 'Answer',
            description: 'Answers item field label',
        }),
    }
};
