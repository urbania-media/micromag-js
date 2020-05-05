export default {
    $id: 'https://schemas.micromag.ca/0.1/fields/geo-position.json',
    title: 'Geo position field',
    type: 'object',
    component: 'geo-position',

    properties: {
        lat: {
            type: 'number',
            title: 'Latitude',
            component: 'number',
            componentProps: {
                float: true,
                floatStep: 0.01,
            },
        },
        lng: {
            type: 'number',
            title: 'Longitude',
            component: 'number',
            componentProps: {
                float: true,
                floatStep: 0.01,
            },
        },
    },
};
