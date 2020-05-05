export default {
    $id: 'https://schemas.micromag.ca/0.1/fields/border-style.json',
    title: 'Border',
    type: 'object',
    component: 'border-style',

    properties: {
        width: {
            $ref: 'https://schemas.micromag.ca/0.1/fields/border-width.json',
            title: 'Largeur',
        },
        style: {
            $ref: 'https://schemas.micromag.ca/0.1/fields/border-type.json',
            title: 'Style',
        },
        color: {
            $ref: 'https://schemas.micromag.ca/0.1/fields/color.json',
            title: 'Color',
        },
        radius: {
            $ref: 'https://schemas.micromag.ca/0.1/fields/border-radius.json',
            title: 'Radius',
            isHorizontal: true,
        },
    },
};
