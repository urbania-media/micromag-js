import { names } from './layouts/names';
import { schemas as messages } from './messages';

export default {
    $id: 'https://schemas.micromag.ca/0.1/screens/map-path.json',
    title: 'Map with path',
    group: 'Map',
    type: 'object',
    intl: {
        title: messages.schemaTitle,
    },

    allOf: [
        {
            $ref: 'https://schemas.micromag.ca/0.1/screens/screen.json',
        },
        {
            properties: {
                layout: {
                    $ref: 'https://schemas.micromag.ca/0.1/fields/screen-layout.json',
                    title: 'Layout',
                    screenType: 'map-path',
                    enum: names,
                    intl: {
                        title: messages.layout,
                    },
                },
                map: {
                    $ref: 'https://schemas.micromag.ca/0.1/elements/map.json',
                    title: 'Map',
                    intl: {
                        title: messages.map,
                    },
                },
                markers: {
                    $ref: 'https://schemas.micromag.ca/0.1/fields/markers.json',
                    title: 'Markers',
                    intl: {
                        title: messages.markers,
                    },
                },
                button: {
                    $ref: 'https://schemas.micromag.ca/0.1/elements/button.json',
                    title: 'Button style',
                    intl: {
                        title: messages.buttonStyle,
                    },
                },
                // cardBackground: {
                //     $ref: 'https://schemas.micromag.ca/0.1/elements/background.json',
                //     title: 'Card background',
                //     intl: {
                //         title: messages.cardBackground,
                //     },
                // },
                background: {
                    $ref: 'https://schemas.micromag.ca/0.1/elements/background.json',
                    title: 'Background',
                    intl: {
                        title: messages.background,
                    },
                },
            },
        },
    ],
};
