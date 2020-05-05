export default {
    $id: 'https://schemas.micromag.ca/0.1/fields/iframe.json',
    title: 'iFrame field',
    type: 'object',

    properties: {
        src: {
            type: 'string',
            title: 'iFrame',
            component: 'url',
        },
        title: {
            type: 'string',
            title: 'Title',
            component: 'text',
        },
    },
};
