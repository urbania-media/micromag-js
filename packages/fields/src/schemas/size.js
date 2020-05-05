export default {
    $id: 'https://schemas.micromag.ca/0.1/fields/size.json',
    title: 'Size field',
    type: 'object',

    properties: {
        width: {
            type: 'number',
            title: 'Largeur',
            component: 'slider-percentage',
            minimum: 0,
            maximum: 100,
            multiplesOf: 1,
        },
        height: {
            type: 'number',
            title: 'Hauteur',
            component: 'slider-percentage',
            minimum: 0,
            maximum: 100,
            multiplesOf: 1,
        },
    },
};
