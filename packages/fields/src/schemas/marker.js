export default {
    $id: 'https://schemas.micromag.ca/0.1/fields/marker.json',
    title: 'Marker field',
    type: 'object',
    component: 'marker',

    properties: {
        image: {
            $ref: 'https://schemas.micromag.ca/0.1/fields/image.json',
            title: 'Image',
        },
        text: {
            $ref: 'https://schemas.micromag.ca/0.1/fields/text.json',
            title: 'Text',
        },
        geoPosition: {
            $ref: 'https://schemas.micromag.ca/0.1/fields/geo-position.json',
            title: 'Geographical position',
        },
    },
};
