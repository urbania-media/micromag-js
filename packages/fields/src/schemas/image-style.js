export default {
    $id: 'https://schemas.micromag.ca/0.1/fields/image-style.json',
    title: 'Image style',
    type: 'object',
    component: 'image-style',

    properties: {
        fit: {
            $ref: 'https://schemas.micromag.ca/0.1/fields/object-fit.json',
            title: 'Positionnement',
        },
        alt: {
            type: 'string',
            title: 'Texte alternatif',
            component: 'text',
        },
    },
};
