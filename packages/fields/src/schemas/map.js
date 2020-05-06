export default {
    $id: 'https://schemas.micromag.ca/0.1/fields/map.json',
    title: 'Map field',
    type: 'object',
    component: 'map',

    properties: {
        center: {
            $ref: 'https://schemas.micromag.ca/0.1/fields/geo-position.json',
            title: 'Center position',
        },
    },
};
