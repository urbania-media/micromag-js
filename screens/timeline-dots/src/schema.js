export default {
    $id: 'https://schemas.micromag.ca/0.1/screens/timeline-dots.json',
    group: 'Timeline',
    title: 'Timeline Dots',
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
