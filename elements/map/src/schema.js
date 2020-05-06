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
                cardStyle: {
                    $ref: 'https://schemas.micromag.ca/0.1/fields/container-style.json',
                    title: 'Card style',
                    // setting: true,
                    intl: {
                        title: messages.cardStyle,
                    },
                },
                mapStyle: {
                    $ref: 'https://schemas.micromag.ca/0.1/fields/map-style.json',
                    title: 'Map style',
                    // setting: true,
                    intl: {
                        title: messages.mapStyle,
                    },
                },
            },
        },
    ],
};
