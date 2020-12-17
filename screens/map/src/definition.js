import { defineMessage } from 'react-intl';
import MapScreen from './Map';
import MapImagesScreen from './MapImages';

export default [
    {
        id: 'map',
        type: 'screen',
        group: defineMessage({
            defaultMessage: 'Map',
            description: 'Map screen group',
        }),
        title: defineMessage({
            defaultMessage: 'Map',
            description: 'Map screen title',
        }),
        component: MapScreen,
        layouts: ['normal'],
        fields: [
            {
                name: 'layout',
                type: 'screen-layout',
                label: defineMessage({
                    defaultMessage: 'Layout',
                    description: 'Layout field label',
                }),
            },
            {
                name: 'splash',
                type: 'text-element',
                label: defineMessage({
                    defaultMessage: 'Splash text',
                    description: 'Splash text field label',
                }),
            },
            {
                name: 'center',
                type: 'geo-position',
                label: defineMessage({
                    defaultMessage: 'Center',
                    description: 'Center field label',
                }),
            },
            {
                name: 'zoom',
                type: 'map-zoom',
                label: defineMessage({
                    defaultMessage: 'Zoom',
                    description: 'Zoom field label',
                }),
            },
            {
                name: 'markers',
                type: 'markers',
                label: defineMessage({
                    defaultMessage: 'Markers',
                    description: 'Markers field label',
                }),
            },
            {
                name: 'background',
                type: 'background',
                label: defineMessage({
                    defaultMessage: 'Background',
                    description: 'Background field label',
                }),
            },
        ],
    },
    {
        id: 'map-images',
        type: 'screen',
        group: defineMessage({
            defaultMessage: 'Map',
            description: 'Map screen group',
        }),
        title: defineMessage({
            defaultMessage: 'MapImages',
            description: 'MapImages screen title',
        }),
        component: MapImagesScreen,
        layouts: ['normal'],
        fields: [
            {
                name: 'layout',
                type: 'screen-layout',
                label: defineMessage({
                    defaultMessage: 'Layout',
                    description: 'Layout field label',
                }),
            },
            {
                name: 'splash',
                type: 'text-element',
                label: defineMessage({
                    defaultMessage: 'Splash text',
                    description: 'Splash text field label',
                }),
            },
            {
                name: 'center',
                type: 'geo-position',
                defaultValue: {
                    lat: 45.5,
                    lng: -73.56,
                },
                label: defineMessage({
                    defaultMessage: 'Center',
                    description: 'Center field label',
                }),
            },
            {
                name: 'zoom',
                type: 'map-zoom',
                defaultValue: 9,
                label: defineMessage({
                    defaultMessage: 'Zoom',
                    description: 'Zoom field label',
                }),
            },
            {
                name: 'markers',
                type: 'markers-with-image',
                label: defineMessage({
                    defaultMessage: 'Markers with image',
                    description: 'Markers field label',
                }),
            },
            {
                name: 'background',
                type: 'background',
                label: defineMessage({
                    defaultMessage: 'Background',
                    description: 'Background field label',
                }),
            },
        ],
    },
];
