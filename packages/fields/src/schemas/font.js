export default {
    $id: 'https://schemas.micromag.ca/0.1/fields/font.json',
    title: 'Font field',
    type: 'object',

    properties: {
        name: {
            type: 'string',
            title: 'Police',
            component: 'font-family',
        },
        style: {
            type: 'object',
            title: 'Mise en forme',
            component: 'font-styles',
            properties: {
                bold: {
                    type: 'boolean',
                },
                italic: {
                    type: 'boolean',
                },
                underline: {
                    type: 'boolean',
                },
                align: {
                    type: 'string',
                },
            },
        },
        size: {
            type: 'number',
            title: 'Taille',
            component: 'font-size',
        },
        lineHeight: {
            type: 'number',
            title: 'Interligne',
            component: 'slider',
            componentProps: {
                min: -2,
                max: 2,
                marksStep: 1,
                withInput: true,
                unit: 'pt',
            },
        },
        letterSpacing: {
            type: 'number',
            title: 'Interlettrage',
            component: 'slider',
            componentProps: {
                min: -2,
                max: 2,
                marksStep: 1,
                withInput: true,
                unit: 'px',
            },
            advanced: true,
        },
    },
};
