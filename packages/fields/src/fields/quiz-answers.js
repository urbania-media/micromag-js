import { defineMessage } from 'react-intl';

export default {
    id: 'quiz-answers',
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
        type: 'quiz-answer',
        breadcrumbLabel: defineMessage({
            defaultMessage: 'Answer',
            description: 'Breadcrumb field label',
        }),
    },
};
