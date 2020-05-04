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
                cardStyle: {
                    $ref: 'https://schemas.micromag.ca/0.1/fields/container-style.json',
                    title: 'Card style',
                    intl: {
                        title: messages.cardStyle,
                    },
                },
                mapStyle: {
                    $ref: 'https://schemas.micromag.ca/0.1/fields/map-style.json',
                    title: 'Map style',
                    intl: {
                        title: messages.mapStyle,
                    },
                },
            },
        },
    ],
};
