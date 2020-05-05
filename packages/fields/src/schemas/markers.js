export default {
    $id: 'https://schemas.micromag.ca/0.1/fields/markers.json',
    title: 'Markers field',
    type: 'array',
    component: 'markers',

    items: {
        $ref: 'https://schemas.micromag.ca/0.1/fields/marker.json',
    },
};
