export default {
    $id: 'https://schemas.micromag.ca/0.1/fields/answers.json',
    title: 'Answers field',
    type: 'array',
    component: 'answers',

    items: {
        $ref: 'https://schemas.micromag.ca/0.1/fields/answer.json',
    },
};
