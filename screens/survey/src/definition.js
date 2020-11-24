import { defineMessage } from 'react-intl';
import SurveyScreen from './Survey';

export default {
    id: 'survey',
    type: 'screen',
    group: defineMessage({
        defaultMessage: 'Questions',
        description: 'Questions screen group',
    }),
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
            label: defineMessage({
                defaultMessage: 'Layout',
                description: 'Layout field label',
            }),
        },
        {
            name: 'question',
            type: 'heading-element',
            label: defineMessage({
                defaultMessage: 'Question',
                description: 'Question field label',
            }),
        },
        {
            name: 'answers',
            type: 'answers',
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
                description: 'Background field label',
            }),
        },
    ],
};
