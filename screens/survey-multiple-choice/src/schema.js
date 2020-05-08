import { schemas as messages } from './messages';
// import { names } from './layouts/names';

export default {
    $id: 'https://schemas.micromag.ca/0.1/screens/survey-multiple-choice.json',
    title: 'Survey with multiple choices',
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
                // layout: {
                //     $ref: 'https://schemas.micromag.ca/0.1/fields/screen-layout.json',
                //     title: 'Layout',
                //     screenType: 'survey-multiple-choice',
                //     enum: names,
                //     intl: {
                //         title: messages.layout,
                //     },
                // },
                multipleAnswers: {
                    type: 'boolean',
                    title: 'Multiple answers',
                    component: 'toggle',
                    default: true,
                    componentProps: {
                        isHorizontal: true,
                    },
                    intl: {
                        title: messages.multipleAnswers,
                    },
                },
                question: {
                    $ref: 'https://schemas.micromag.ca/0.1/fields/question.json',
                    title: 'Question',
                    intl: {
                        title: messages.question,
                    },
                },
                answers: {
                    $ref: 'https://schemas.micromag.ca/0.1/fields/answers.json',
                    title: 'Answers',
                    intl: {
                        title: messages.answers,
                    },
                },
                success: {
                    $ref: 'https://schemas.micromag.ca/0.1/fields/question.json',
                    title: 'Success',
                    intl: {
                        title: messages.success,
                    },
                },
                failure: {
                    $ref: 'https://schemas.micromag.ca/0.1/fields/question.json',
                    title: 'Failure',
                    intl: {
                        title: messages.failure,
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
