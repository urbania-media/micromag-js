export default {
    $id: 'https://schemas.micromag.ca/0.1/fields/grid-layout.json',
    title: 'Grid layout field',
    type: 'object',

    properties: {
        layout: {
            type: 'array',
            title: 'Mise en page',
            items: {
                type: 'object',
                properties: {
                    row: {
                        type: 'number',
                    },
                    columns: {
                        type: 'array',
                        items: {
                            type: 'number',
                        },
                    },
                },
            },
            component: 'grid-layout',
        },
        spacing: {
            title: 'Espacement',
            type: 'number',
            component: 'spacing',
            componentProps: {
                isHorizontal: true,
            },
            default: 2,
        },
    },
};
