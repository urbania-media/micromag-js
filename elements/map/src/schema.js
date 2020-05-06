import { schemas as messages } from './messages';

export default {
    $id: 'https://schemas.micromag.ca/0.1/elements/map.json',
    title: 'Map',
    type: 'object',
    component: 'element',
    intl: {
        title: messages.schemaTitle,
    },
    allOf: [
        {
            $ref: 'https://schemas.micromag.ca/0.1/elements/element.json',
        },
        {
            properties: {
                map: {
                    $ref: 'https://schemas.micromag.ca/0.1/fields/map.json',
                    title: 'Map',
                    intl: {
                        title: messages.map,
                    },
                },
                // mapStyle: {
                //     $ref: 'https://schemas.micromag.ca/0.1/fields/map-style.json',
                //     title: 'Map style',
                //     setting: true,
                //     intl: {
                //         title: messages.mapStyle,
                //     },
                // },
            },
        },
    ],
};
