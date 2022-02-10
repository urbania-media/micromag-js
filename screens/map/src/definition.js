import { defineMessage } from 'react-intl';

import MapScreen from './Map';
import MapImagesScreen from './MapImages';
import * as transforms from './transforms/index';

export default [
    {
        id: 'map',
        type: 'screen',
        group: {
            label: defineMessage({
                defaultMessage: 'Map',
                description: 'Screen group',
            }),
            order: 6,
        },
        title: defineMessage({
            defaultMessage: 'Map',
            description: 'Screen title',
        }),
        component: MapScreen,
        layouts: ['normal'],
        transforms,
        states: [
            {
                id: 'title',
                label: defineMessage({
                    defaultMessage: 'Title',
                    description: 'State label',
                }),
                fields: [
                    {
                        name: 'title',
                        type: 'heading-element',
                        theme: {
                            textStyle: 'heading1',
                        },
                        label: defineMessage({
                            defaultMessage: 'Title',
                            description: 'Field label',
                        }),
                    },
                    {
                        name: 'description',
                        type: 'text-element',
                        theme: {
                            textStyle: 'text',
                        },
                        label: defineMessage({
                            defaultMessage: 'Description',
                            description: 'Field label',
                        }),
                    },
                    {
                        name: 'button',
                        type: 'button-element',
                        theme: {
                            textStyle: 'button',
                        },
                        label: defineMessage({
                            defaultMessage: 'Button',
                            description: 'Field label',
                        }),
                    },
                ]
            },
            {
                id: 'map',
                label: defineMessage({
                    defaultMessage: 'Map',
                    description: 'State label',
                }),
                fields: [
                    {
                        name: 'draggable',
                        type: 'toggle',
                        defaultValue: true,
                        label: defineMessage({
                            defaultMessage: 'Draggable',
                            description: 'Field label',
                        }),
                    },
                ]
            },
            {
                id: 'markers',
                label: defineMessage({
                    defaultMessage: 'Markers',
                    description: 'State label',
                }),
                repeatable: true,
                fieldName: 'markers',
                fields: [

                ]
            }
        ],
        fields: [

            {
                name: 'markers',
                type: 'markers',
                theme: {
                    title: {
                        textStyle: 'heading3',
                    },
                    description: {
                        textStyle: 'text',
                    },
                },
                label: defineMessage({
                    defaultMessage: 'Markers',
                    description: 'Field label',
                }),
            },
            {
                name: 'background',
                type: 'background',
                label: defineMessage({
                    defaultMessage: 'Background',
                    description: 'Field label',
                }),
            },
        ],
    },
    {
        id: 'map-images',
        type: 'screen',
        group: {
            label: defineMessage({
                defaultMessage: 'Map',
                description: 'Screen group',
            }),
            order: 6,
        },
        title: defineMessage({
            defaultMessage: 'Map with image markers',
            description: 'Screen title',
        }),
        component: MapImagesScreen,
        layouts: ['normal'],
        transforms,
        fields: [
            {
                name: 'title',
                type: 'heading-element',
                theme: {
                    textStyle: 'heading1',
                },
                label: defineMessage({
                    defaultMessage: 'Title',
                    description: 'Field label',
                }),
            },
            {
                name: 'description',
                type: 'text-element',
                theme: {
                    textStyle: 'text',
                },
                label: defineMessage({
                    defaultMessage: 'Description',
                    description: 'Field label',
                }),
            },
            {
                name: 'button',
                type: 'button-element',
                theme: {
                    textStyle: 'button',
                },
                label: defineMessage({
                    defaultMessage: 'Button',
                    description: 'Field label',
                }),
            },
            {
                name: 'draggable',
                type: 'toggle',
                defaultValue: true,
                label: defineMessage({
                    defaultMessage: 'Draggable',
                    description: 'Field label',
                }),
            },
            {
                name: 'markers',
                type: 'markers-with-image',
                theme: {
                    title: {
                        textStyle: 'heading3',
                    },
                    description: {
                        textStyle: 'text',
                    },
                },
                label: defineMessage({
                    defaultMessage: 'Markers with image',
                    description: 'Field label',
                }),
            },
            {
                name: 'background',
                type: 'background',
                label: defineMessage({
                    defaultMessage: 'Background',
                    description: 'Field label',
                }),
            },
        ],
    },
];
