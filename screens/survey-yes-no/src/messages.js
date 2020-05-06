import { defineMessages } from 'react-intl';

const messages = defineMessages({});

export const schemas = defineMessages({
    schemaTitle: {
        id: 'schema.title',
        defaultMessage: 'Survey with yes or no',
    },
    background: {
        id: 'schema.properties.background',
        defaultMessage: 'Background',
    },
    questionText: {
        id: 'schema.properties.question_text',
        defaultMessage: 'Question text',
    },
    questionImage: {
        id: 'schema.properties.question_image',
        defaultMessage: 'Question image',
    },
    goodAnswerText: {
        id: 'schema.properties.good_answer_text',
        defaultMessage: 'YES answer text',
    },
    goodAnswerImage: {
        id: 'schema.properties.good_answer_image',
        defaultMessage: 'YES answer image',
    },
    badAnswerText: {
        id: 'schema.properties.bad_answer_text',
        defaultMessage: 'NO answer text',
    },
    badAnswerImage: {
        id: 'schema.properties.bad_answer_image',
        defaultMessage: 'NO answer image',
    },
});

export default messages;
