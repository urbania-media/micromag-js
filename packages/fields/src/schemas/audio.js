import messages from '../messages';

export default {
    $id: 'https://schemas.micromag.ca/0.1/fields/audio.json',
    title: 'Audio field',
    type: 'object',
    component: 'audio',
    intl: {
        title: messages.audioTitle,
    },
    properties: {
        url: {
            type: 'string',
        },
    },
};
