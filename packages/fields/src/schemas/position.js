export default {
    $id: 'https://schemas.micromag.ca/0.1/fields/position.json',
    title: 'Position field',
    type: 'object',

    properties: {
        axisAlign: {
            type: 'string',
            title: 'Vertical',
        },
        crossAlign: {
            type: 'string',
            title: 'Horizontal',
        },
    },
};
