import { defineMessage } from 'react-intl';

import QuizScreen from './Quiz';

export default {
    id: 'quiz',
    type: 'screen',
    group: {
        label: defineMessage({
            defaultMessage: 'Questions',
            description: 'Questions screen group',
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
        },
    ],
};
