export default {
    $id: 'https://schemas.micromag.ca/0.1/fields/container-style.json',
    title: 'Container style',
    type: 'object',
    component: 'container-style',

    properties: {
        size: {
            $ref: 'https://schemas.micromag.ca/0.1/fields/size.json',
            title: 'Taille',
        },
        backgroundColor: {
            $ref: 'https://schemas.micromag.ca/0.1/fields/color.json',
            title: 'Couleur',
        },
        border: {
            $ref: 'https://schemas.micromag.ca/0.1/fields/border.json',
            title: 'Bordure',
        },
    },
};
