import { defineMessages } from 'react-intl';

const messages = defineMessages({
    submit: {
        id: 'screen.submit',
        defaultMessage: 'Submit',
    },
    retry: {
        id: 'screen.retry',
        defaultMessage: 'Retry',
    },
});

export const schemas = defineMessages({
    schemaTitle: {
        id: 'schema.title',
        defaultMessage: 'Survey with multiple choices',
    },
    question: {
        id: 'schema.properties.question',
        defaultMessage: 'Question',
    },
    answers: {
        id: 'schema.properties.answers',
        defaultMessage: 'Answers',
    },
    success: {
        id: 'schema.properties.success',
        defaultMessage: 'Success',
    },
    failure: {
        id: 'schema.properties.failure',
        defaultMessage: 'Failure',
    },
    textStyle: {
        id: 'schema.properties.text_style',
        defaultMessage: 'Text style',
    },
    buttonStyle: {
        id: 'schema.properties.button',
        defaultMessage: 'Button style',
    },
    background: {
        id: 'schema.properties.background',
        defaultMessage: 'Background',
    },
});

export default messages;
