import { schemas as messages } from './messages';
import { layouts } from './SurveyYesNo';

export default {
    $id: 'https://schemas.micromag.ca/0.1/screens/survey-yes-no.json',
    title: 'Survey with yes or no',
    group: 'Survey',
    type: 'object',
    intl: {
        title: messages.schemaTitle,
    },
    allOf: [
        {
            $ref: 'https://schemas.micromag.ca/0.1/screens/screen.json',
        },
        {
            properties: {
                layout: {
                    $ref: 'https://schemas.micromag.ca/0.1/fields/screen-layout.json',
                    title: 'Layout',
                    screenType: 'survey-yes-no',
                    enum: layouts,
                    intl: {
                        title: messages.layout,
                    },
                },
                question: {
                    $ref: 'https://schemas.micromag.ca/0.1/fields/question.json',
                    title: 'Question',
                    intl: {
                        title: messages.question,
                    },
                },
                answerYes: {
                    $ref: 'https://schemas.micromag.ca/0.1/fields/question.json',
                    title: 'Answer Yes',
                    intl: {
                        title: messages.answerYes,
                    },
                },
                answerNo: {
                    $ref: 'https://schemas.micromag.ca/0.1/fields/question.json',
                    title: 'Answer No',
                    intl: {
                        title: messages.answerNo,
                    },
                },
                // TODO: figure out how to collapse this with settings or else
                // textStyle: {
                //     $ref: 'https://schemas.micromag.ca/0.1/fields/text-style.json',
                //     title: 'Text style',
                //     setting: true,
                //     intl: {
                //         title: messages.textStyle,
                //     },
                // },
                button: {
                    $ref: 'https://schemas.micromag.ca/0.1/elements/button.json',
                    title: 'Button style',
                    intl: {
                        title: messages.buttonStyle,
                    },
                },
                background: {
                    $ref: 'https://schemas.micromag.ca/0.1/elements/background.json',
                    title: 'Background',
                    intl: {
                        title: messages.background,
                    },
                },
            },
        },
    ],
};
