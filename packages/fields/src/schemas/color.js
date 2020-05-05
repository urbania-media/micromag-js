export default {
    $id: 'https://schemas.micromag.ca/0.1/fields/color.json',
    title: 'Color field',
    type: 'object',
    component: 'color',

    properties: {
        color: {
            type: 'string',
            title: 'Color',
            i18n: {
                fr: {
                    title: 'Couleur',
                },
            },
        },
        alpha: {
            type: 'number',
            title: 'Opacity',
            i18n: {
                fr: {
                    title: 'Opacité',
                },
            },
        },
    },
};
