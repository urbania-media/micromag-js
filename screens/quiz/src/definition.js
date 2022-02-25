import { defineMessage } from 'react-intl';
import QuizScreen from './Quiz';
import QuizMultipleScreen from './QuizMultiple';

export default [
    {
        id: 'quiz',
        type: 'screen',
        group: {
            label: defineMessage({
                defaultMessage: 'Questions',
                description: 'Screen group',
            }),
            order: 7,
        },
        title: defineMessage({
            defaultMessage: 'Quiz',
            description: 'Quiz screen title',
        }),
        component: QuizScreen,
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
                type: 'quiz-answers',
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
                name: 'result',
                type: 'text-element',
                theme: {
                    textStyle: 'text',
                },
                label: defineMessage({
                    defaultMessage: 'Result',
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
                        type: 'field-with-form',
                        label: defineMessage({
                            defaultMessage: 'Buttons',
                            description: 'Field label',
                        }),
                        noValueLabel: defineMessage({
                            defaultMessage: 'Edit style...',
                            description: 'No value field label',
                        }),
                        field: {
                            type: 'box-style',
                        },
                    },
                    {
                        name: 'goodAnswerColor',
                        type: 'color',
                        label: defineMessage({
                            defaultMessage: 'Good answer color',
                            description: 'Field label',
                        }),
                    },
                    {
                        name: 'badAnswerColor',
                        type: 'color',
                        label: defineMessage({
                            defaultMessage: 'Bad answer color',
                            description: 'Field label',
                        }),
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
                    label: {
                        textStyle: 'heading2',
                    },
                },
            },
        ],
    },
    {
        id: 'quiz-multiple',
        type: 'screen',
        group: {
            label: defineMessage({
                defaultMessage: 'Questions',
                description: 'Screen group',
            }),
            order: 7,
        },
        title: defineMessage({
            defaultMessage: 'Quiz with multiple questions',
            description: 'Screen title',
        }),
        component: QuizMultipleScreen,
        layouts: ['top', 'middle', 'bottom', 'split'],
        states: [
            {
                id: 'intro',
                label: defineMessage({
                    defaultMessage: 'Intro',
                    description: 'State label',
                }),
            },
            {
                id: 'questions',
                label: defineMessage({
                    defaultMessage: 'Questions',
                    description: 'State label',
                }),
                repeatable: true,
                fieldName: 'questions',
                fields: [
                    {
                        name: 'text',
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
                        type: 'quiz-answers',
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
                ]
            },
            {
                id: 'results',
                label: defineMessage({
                    defaultMessage: 'Results',
                    description: 'State label',
                }),
                repeatable: true,
                fields: [
                ]
            }
        ],
        fields: [
            {
                name: 'background',
                type: 'background',
                label: defineMessage({
                    defaultMessage: 'Background',
                    description: 'Field label',
                }),
            },
            {
                name: 'callToAction',
                type: 'call-to-action',
                theme: {
                    label: {
                        textStyle: 'heading2',
                    },
                },
            },
        ],
    },
];
