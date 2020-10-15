import { defineMessage } from 'react-intl';
import SurveyYesNo from './SurveyYesNo';

export default {
    id: 'survey-yes-no',
    type: 'screen',
    title: defineMessage({
        defaultMessage: 'SurveyYesNo',
        description: 'SurveyYesNo screen title',
    }),
    component: SurveyYesNo,
    layouts: ['center', 'top', 'bottom'],
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
                defaultMessage: 'Question?',
                description: 'Question field label',
            }),
        },
        {
            name: 'answerYes',
            type: 'text',
            label: defineMessage({
                defaultMessage: 'AnswerYes',
                description: 'AnswerYes field label',
            }),
        },
        {
            name: 'answerNo',
            type: 'text',
            label: defineMessage({
                defaultMessage: 'AnswerNo',
                description: 'AnswerNo field label',
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
