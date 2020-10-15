import { defineMessage } from 'react-intl';
import SurveyMultipleChoice from './SurveyMultipleChoice';

export default {
    id: 'survey-multiple-choice',
    type: 'screen',
    title: defineMessage({
        defaultMessage: 'SurveyMultipleChoice',
        description: 'SurveyMultipleChoice screen title',
    }),
    component: SurveyMultipleChoice,
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
            // @TODO
            name: 'multipleAnswers',
            type: 'toggle',
            componentProps: {
                isHorizontal: true,
            },
            label: defineMessage({
                defaultMessage: 'Multiple answers',
                description: 'Multiple answers field label',
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
            // @TODO
            name: 'options',
            type: 'options',
            label: defineMessage({
                defaultMessage: 'Options',
                description: 'Options field label',
            }),
        },
        {
            name: 'success',
            type: 'text',
            label: defineMessage({
                defaultMessage: 'Success',
                description: 'Success field label',
            }),
        },
        {
            name: 'failure',
            type: 'text',
            label: defineMessage({
                defaultMessage: 'Failure',
                description: 'Failure field label',
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
