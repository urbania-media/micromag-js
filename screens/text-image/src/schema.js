export default {
    $id: 'https://schemas.micromag.ca/0.1/screens/text-image.json',
    group: 'Text',
    title: 'Text and image',
    type: 'object',
    allOf: [
        {
            $ref: 'https://schemas.micromag.ca/0.1/screens/screen.json',
        },
        {
            properties: {
                layout: {
                    type: 'string',
                    title: 'Mise en page',
                    enum: ['default'],
                    default: 'default',
                },
                text: {
                    title: 'Texte',
                    $ref: 'https://schemas.micromag.ca/0.1/elements/text.json',
                    component: 'element',
                },
                image: {
                    title: 'Image',
                    $ref: 'https://schemas.micromag.ca/0.1/elements/image.json',
                    component: 'element',
                },
                background: {
                    title: 'Arrière-Plan',
                    $ref: 'https://schemas.micromag.ca/0.1/elements/background.json',
                    componentProps: {
                        withBorders: true,
                        isSection: true,
                    },
                },
            },
        },
    ],
};
