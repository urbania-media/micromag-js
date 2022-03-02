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
                        type: 'box-style-form',
                        label: defineMessage({
                            defaultMessage: 'Buttons',
                            description: 'Field label',
                        }),
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
                fields: [
                    {
                        name: 'introLayout',
                        type: 'screen-layout',
                        defaultValue: 'middle',
                        screenState: 'intro',
                        label: defineMessage({
                            defaultMessage: 'Layout',
                            description: 'Layout field label',
                        }),
                    },
                    {
                        name: 'title',
                        type: 'heading-element',
                        theme: {
                            textStyle: 'heading2',
                        },
                        label: defineMessage({
                            defaultMessage: 'Title',
                            description: 'Field label',
                        }),
                    },
                    {
                        name: 'description',
                        type: 'text-element',
                        theme: {
                            textStyle: 'text',
                        },
                        label: defineMessage({
                            defaultMessage: 'Description',
                            description: 'Field label',
                        }),
                    },
                    {
                        name: 'introButton',
                        type: 'button-element',
                        theme: {
                            textStyle: 'button',
                        },
                        label: defineMessage({
                            defaultMessage: 'Button',
                            description: 'Field label',
                        }),
                    },
                    {
                        name: 'introBackground',
                        type: 'background',
                        label: defineMessage({
                            defaultMessage: 'Background',
                            description: 'Field label',
                        }),
                    },
                ]
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
                        type: 'quiz-points-answers',
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
                        name: 'background',
                        type: 'background',
                        label: defineMessage({
                            defaultMessage: 'Background',
                            description: 'Field label',
                        }),
                    },
                ],
            },
            {
                id: 'results',
                label: defineMessage({
                    defaultMessage: 'Results',
                    description: 'State label',
                }),
                repeatable: true,
                fields: [
                    {
                        name: 'layout',
                        type: 'screen-layout',
                        defaultValue: 'top',
                        screenState: 'results',
                        label: defineMessage({
                            defaultMessage: 'Layout',
                            description: 'Layout field label',
                        }),
                    },
                    {
                        name: 'title',
                        type: 'heading-element',
                        theme: {
                            textStyle: 'heading2',
                        },
                        label: defineMessage({
                            defaultMessage: 'Title',
                            description: 'Field label',
                        }),
                    },
                    {
                        name: 'description',
                        type: 'text-element',
                        theme: {
                            textStyle: 'text',
                        },
                        label: defineMessage({
                            defaultMessage: 'Description',
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
                        name: 'background',
                        type: 'background',
                        label: defineMessage({
                            defaultMessage: 'Background',
                            description: 'Field label',
                        }),
                    },
                ],
            },
        ],
        fields: [
            {
                name: 'layout',
                type: 'screen-layout',
                defaultValue: 'top',
                label: defineMessage({
                    defaultMessage: 'Layout',
                    description: 'Field label',
                }),
            },
            {
                type: 'fields',
                label: defineMessage({
                    defaultMessage: 'Styles',
                    description: 'Field label',
                }),
                isList: true,
                fields: [
                    {
                        name: 'buttonsStyle',
                        type: 'box-style-form',
                        label: defineMessage({
                            defaultMessage: 'Buttons',
                            description: 'Field label',
                        })
                    },
                ]
            },
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
