export default {
    $id: 'https://schemas.micromag.ca/0.1/fields/text-style.json',
    title: 'Text style',
    type: 'object',
    component: 'text-style',

    properties: {
        fontFamily: {
            $ref: 'https://schemas.micromag.ca/0.1/fields/font-family.json',
            title: 'Police',
        },
        color: {
            $ref: 'https://schemas.micromag.ca/0.1/fields/color.json',
            title: 'Color',
            description: 'Text color',
            i18n: {
                fr: {
                    title: 'Couleur',
                    description: 'Couleur du texte',
                },
            },
        },
        fontSize: {
            $ref: 'https://schemas.micromag.ca/0.1/fields/font-size.json',
            title: 'Taille',
        },
        fontStyle: {
            $ref: 'https://schemas.micromag.ca/0.1/fields/font-styles.json',
            title: 'Mise en forme',
        },
        lineHeight: {
            $ref: 'https://schemas.micromag.ca/0.1/fields/line-height.json',
            title: 'Interligne',
            advanced: true,
        },
        letterSpacing: {
            $ref: 'https://schemas.micromag.ca/0.1/fields/letter-spacing.json',
            title: 'Interlettrage',
            advanced: true,
        },
    },
};
