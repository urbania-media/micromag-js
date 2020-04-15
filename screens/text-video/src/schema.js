export default {
    $id: 'https://schemas.micromag.ca/0.1/screens/text-video.json',
    group: 'Text',
    title: 'Text and video',
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
                    enum: ['default', 'split'],
                    default: 'default',
                },
                text: {
                    title: 'Texte',
                    $ref: 'https://schemas.micromag.ca/0.1/elements/text.json',
                    component: 'element',
                },
                video: {
                    title: 'Vidéo',
                    $ref: 'https://schemas.micromag.ca/0.1/elements/video.json',
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
