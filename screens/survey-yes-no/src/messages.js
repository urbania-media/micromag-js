import { defineMessages } from 'react-intl';

const messages = defineMessages({
    yes: {
        id: 'screen.yes',
        defaultMessage: 'Yes',
    },
    no: {
        id: 'screen.no',
        defaultMessage: 'No',
    },
    retry: {
        id: 'screen.retry',
        defaultMessage: 'Retry',
    },
});

export const schemas = defineMessages({
    schemaTitle: {
        id: 'schema.title',
        defaultMessage: 'Survey with yes or no',
    },
    background: {
        id: 'schema.properties.background',
        defaultMessage: 'Background',
    },
    question: {
        id: 'schema.properties.question',
        defaultMessage: 'Question',
    },
    answerYes: {
        id: 'schema.properties.answer_yes',
        defaultMessage: 'Answer Yes',
    },
    answerNo: {
        id: 'schema.properties.answer_no',
        defaultMessage: 'Answer No',
    },
    textStyle: {
        id: 'schema.properties.text_style',
        defaultMessage: 'Text style',
    },
    buttonStyle: {
        id: 'schema.properties.button',
        defaultMessage: 'Button style',
    },
});

export default messages;
