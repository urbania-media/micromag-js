export default {
    $id: 'https://schemas.micromag.ca/0.1/fields/answer.json',
    title: 'Answer Field',
    type: 'object',
    component: 'answer',

    properties: {
        isTrue: {
            type: 'boolean',
            title: 'True',
            component: 'toggle',
            default: true,
            componentProps: {
                isHorizontal: true,
            },
        },
        text: {
            $ref: 'https://schemas.micromag.ca/0.1/fields/text.json',
            title: 'Text',
        },
        image: {
            $ref: 'https://schemas.micromag.ca/0.1/fields/image.json',
            title: 'Image',
        },
        video: {
            $ref: 'https://schemas.micromag.ca/0.1/fields/video.json',
            title: 'Video',
        },
    },
};
