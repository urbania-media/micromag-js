export default {
    $id: 'https://schemas.micromag.ca/0.1/fields/question.json',
    title: 'Question Field',
    type: 'object',
    component: 'question',
    properties: {
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
