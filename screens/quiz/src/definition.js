import { defineMessage } from 'react-intl';
import QuizScreen from './Quiz';

export default {
    id: 'quiz',
    type: 'screen',
    group: defineMessage({
        defaultMessage: 'Questions',
        description: 'Questions screen group',
    }),
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
            label: defineMessage({
                defaultMessage: 'Layout',
                description: 'Layout field label',
            }),
        },
        {
            name: 'question',
            type: 'text',
            label: defineMessage({
                defaultMessage: 'Question',
                description: 'Question field label',
            }),
        },
        {
            // [{ id:number, label:String }, ....]
            name: 'options',
            type: 'options',
            label: defineMessage({
                defaultMessage: 'Options',
                description: 'Options field label',
            }),
        },
        {
            // index of options
            name: 'answer-index',
            type: 'number',
            label: defineMessage({
                defaultMessage: 'Answer Index',
                description: 'Answer Index field label',
            }),
        },
        {
            name: 'result',
            type: 'result',
            label: defineMessage({
                defaultMessage: 'Result',
                description: 'Result field label',
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
    ],
};
