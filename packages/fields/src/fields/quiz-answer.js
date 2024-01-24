import { defineMessage } from 'react-intl';

export default {
    id: 'quiz-answer',
    component: 'field-with-form',
    labelPath: 'label.body',
    fields: [
        {
            name: 'label',
            type: 'text-element',
            label: defineMessage({
                defaultMessage: 'Label',
                description: 'Field label',
            }),
        },
        {
            name: 'good',
            type: 'true-false',
            label: defineMessage({
                defaultMessage: 'Answer icon value',
                description: 'Field label',
            }),
        },
        {
            name: 'customAnswerLabel',
            type: 'text-element',
            textOnly: true,
            fieldsProps: {
                textStyle: {
                    excludedFields: ['highlight', 'link'],
                },
            },
            label: defineMessage({
                defaultMessage: 'Answer feedback',
                description: 'Field label',
            }),
        },
        {
            name: 'answerImage',
            type: 'visual',
            label: defineMessage({
                defaultMessage: 'Answer feedback image',
                description: 'Visual field label',
            }),
        },
        {
            type: 'fields',
            isList: true,
            fields: [
                {
                    name: 'textStyle',
                    type: 'text-style-form',

                    label: defineMessage({
                        defaultMessage: 'Button text style',
                        description: 'Field label',
                    }),
                },
                {
                    name: 'buttonStyle',
                    type: 'box-style-form',
                    label: defineMessage({
                        defaultMessage: 'Button style',
                        description: 'Field label',
                    }),
                },
            ],
        },
    ],
};
