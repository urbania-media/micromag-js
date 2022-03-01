import { defineMessage } from 'react-intl';

export default {
    id: 'quiz-points-answers',
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
        type: 'quiz-points-answer',
        breadcrumbLabel: defineMessage({
            defaultMessage: 'Answer',
            description: 'Quiz answers item field label',
        }),
    }
};
