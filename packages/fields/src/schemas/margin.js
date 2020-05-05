export default {
    $id: 'https://schemas.micromag.ca/0.1/fields/margin.json',
    title: 'Margin field',
    type: 'object',

    properties: {
        top: {
            type: 'number',
            title: 'Marge en haut',
            component: 'margin',
            componentProps: {
                withoutLabel: true,
                isHorizontal: true,
                direction: 'top',
            },
        },
        bottom: {
            type: 'number',
            title: 'Marge en bas',
            component: 'margin',
            componentProps: {
                withoutLabel: true,
                isHorizontal: true,
                direction: 'bottom',
            },
        },
    },
};
