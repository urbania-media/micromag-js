export default {
    $id: 'https://schemas.micromag.ca/0.1/fields/video-controls.json',
    title: 'Video controls field',
    type: 'object',

    properties: {
        progress: {
            title: 'Barre de proression',
            $ref: 'https://schemas.micromag.ca/0.1/fields/video-control.json',
            componentProps: {
                isSection: true,
                withBorders: true,
            },
        },
        playback: {
            title: 'Contrôles de lecture',
            $ref: 'https://schemas.micromag.ca/0.1/fields/video-control.json',
            componentProps: {
                isSection: true,
                withBorders: true,
            },
        },
        volume: {
            title: 'Bouton de volume',
            $ref: 'https://schemas.micromag.ca/0.1/fields/video-control.json',
            componentProps: {
                isSection: true,
                withBorders: true,
            },
        },
    },
};
