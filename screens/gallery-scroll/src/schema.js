export default {
    $id: 'https://schemas.micromag.ca/0.1/screens/gallery-scroll.json',
    group: 'Gallery',
    title: 'Gallery Scroll',
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
                // Complete this
                images: {
                    type: 'array',
                    title: 'Images',
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
