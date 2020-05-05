export default {
    $id: 'https://schemas.micromag.ca/0.1/fields/slides.json',
    title: 'Slides field',
    type: 'array',
    component: 'slides',

    items: {
        $ref: 'https://schemas.micromag.ca/0.1/fields/slide.json',
    },
};
