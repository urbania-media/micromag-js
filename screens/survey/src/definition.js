import { defineMessage } from 'react-intl';
import SurveyScreen from './Survey';

export default {
    id: 'survey',
    type: 'screen',
    group: {
        label: defineMessage({
            defaultMessage: 'Questions',
            description: 'Screen group',
        }),
        order: 7,
    },
    title: defineMessage({
        defaultMessage: 'Survey',
        description: 'Survey screen title',
    }),
    component: SurveyScreen,
    layouts: ['top', 'middle', 'bottom', 'split'],
    fields: [
        {
            name: 'layout',
            type: 'screen-layout',
            defaultValue: 'top',
            label: defineMessage({
                defaultMessage: 'Layout',
                description: 'Layout field label',
            }),
        },
        {
            name: 'question',
            type: 'heading-element',
            theme: {
                textStyle: 'heading2',
            },
            label: defineMessage({
                defaultMessage: 'Question',
                description: 'Question field label',
            }),
        },
        {
            name: 'answers',
            type: 'answers',
            theme: {
                label: {
                    textStyle: 'button',
                },
            },
            label: defineMessage({
                defaultMessage: 'Answers',
                description: 'Field label',
            }),
        },
        {
            name: 'withoutPercentage',
            type: 'toggle',
            defaultValue: false,
            label: defineMessage({
                defaultMessage: 'Without percentage',
                description: 'Field label',
            }),
        },
        {
            name: 'withoutBar',
            type: 'toggle',
            defaultValue: false,
            label: defineMessage({
                defaultMessage: 'Without bar',
                description: 'Field label',
            }),
        },
        {
            type: 'fields',
            isList: true,
            label: defineMessage({
                defaultMessage: 'Styles',
                description: 'Field section label',
            }),
            fields: [
                {
                    name: 'buttonsStyle',
                    type: 'box-style-form',
                    label: defineMessage({
                        defaultMessage: 'Buttons',
                        description: 'Field label',
                    }),
                },
                {
                    name: 'resultsStyle',
                    type: 'field-with-form',
                    label: defineMessage({
                        defaultMessage: 'Results',
                        description: 'Field label',
                    }),
                    noValueLabel: defineMessage({
                        defaultMessage: 'Edit style...',
                        description: 'No value field label',
                    }),
                    field: {
                        type: 'graph-bar-style',
                    },
                },
            ],
        },

        {
            name: 'background',
            type: 'background',
            label: defineMessage({
                defaultMessage: 'Background',
                description: 'Background field label',
            }),
        },
        {
            name: 'callToAction',
            type: 'call-to-action',
            theme: {
                boxStyle: 'cta',
                label: {
                    textStyle: 'cta',
                },
            },
        },
    ],
};
