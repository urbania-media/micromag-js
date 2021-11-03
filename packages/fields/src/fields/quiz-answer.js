import { defineMessage } from 'react-intl';

export default {
    id: 'quiz-answer',
    component: 'field-with-form',
    labelPath: 'label.body',
    fields: [
        {
            name: 'label',
            type: 'text-element',
            textOnly: true,
            label: defineMessage({
                defaultMessage: 'Label',
                description: 'Field label',
            }),
        },
        {
            name: 'good',
            type: 'toggle',
            label: defineMessage({
                defaultMessage: 'Good answer',
                description: 'Field label',
            }),
        }
    ]
};
