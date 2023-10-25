import { defineMessage } from 'react-intl';

export default {
    id: 'quiz-points-answer',
    component: 'field-with-form',
    labelPath: 'label.body',
    fields: [
        {
            name: 'label',
            type: 'text-element',
            textOnly: true,
            fieldsProps: {
                textStyle: {
                    excludedFields: ['highlight', 'link'],
                },
            },
            label: defineMessage({
                defaultMessage: 'Label',
                description: 'Field label',
            }),
        },
        {
            name: 'points',
            type: 'number',
            isHorizontal: true,
            label: defineMessage({
                defaultMessage: 'Points',
                description: 'Field label',
            }),
        },
        {
            type: 'fields',
            isList: true,
            fields: [
                {
                    type: 'box-style-form',
                    name: 'buttonStyle',
                    label: defineMessage({
                        defaultMessage: 'Button style',
                        description: 'Field label',
                    }),
                },
            ],
        },
    ],
};
