export default {
    $id: 'https://schemas.micromag.ca/0.1/fields/object-fit.json',
    title: 'Positionnement',
    type: 'object',

    properties: {
        fill: {
            title: 'Remplissage',
            type: 'boolean',
            component: 'toggle',
        },
        size: {
            title: 'Type de remplissage',
            type: 'string',
            enum: ['cover', 'contain', 'fill', 'scale-down', 'none'],
            component: 'object-fit-size',
        },
        position: {
            title: 'Position',
            type: 'object',
            component: 'position',
        },
    },
};
