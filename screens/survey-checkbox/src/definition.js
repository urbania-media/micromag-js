import { defineMessage } from 'react-intl';
import SurveyCheckbox from './SurveyCheckbox';

export default {
    id: 'survey-checkbox',
    type: 'screen',
    group: defineMessage({
        defaultMessage: 'Questions',
        description: 'Questions screen group',
    }),
    title: defineMessage({
        defaultMessage: 'SurveyCheckbox',
        description: 'SurveyCheckbox screen title',
    }),
    component: SurveyCheckbox,
    layouts: ['normal'],
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
            name: 'button',
            type: 'button',
            label: defineMessage({
                defaultMessage: 'Button style',
                description: 'Button style field label',
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
