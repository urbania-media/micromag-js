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
            name: 'visual',
            type: 'visual',
            label: defineMessage({
                defaultMessage: 'Image',
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
            name: 'points',
            type: 'number',
            isHorizontal: true,
            label: defineMessage({
                defaultMessage: 'Points',
                description: 'Field label',
            }),
        },
        // {
        //     name: 'result',
        //     type: 'text-element',
        //     // textOnly: true,
        //     fieldsProps: {
        //         // textStyle: {
        //         //     excludedFields: ['highlight', 'link'],
        //         // },
        //     },
        //     label: defineMessage({
        //         defaultMessage: 'Answer feedback',
        //         description: 'Field label',
        //     }),
        // },
        {
            name: 'buttonLayout',
            type: 'button-layout',
            label: defineMessage({
                defaultMessage: 'Layout',
                description: 'Field label',
            }),
            types: [
                'label-bottom',
                'label-top',
                'no-label',
                'label-over',
                'label-left',
                'label-right',
            ],
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
