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
                description: 'Map screen group',
            }),
            order: 6,
        },
        title: defineMessage({
            defaultMessage: 'Map',
            description: 'Map screen title',
        }),
        component: MapScreen,
        layouts: ['normal'],
        transforms,
        fields: [
            {
                name: 'title',
                type: 'heading-element',
                theme: {
                    textStyle: 'heading2',
                },
                label: defineMessage({
                    defaultMessage: 'Title',
                    description: 'Title field label',
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
                    description: 'Description field label',
                }),
            },
            {
                name: 'button',
                type: 'text-element',
                theme: {
                    textStyle: 'button',
                },
                label: defineMessage({
                    defaultMessage: 'Button',
                    description: 'Button field label',
                }),
            },
            {
                name: 'scrollable',
                type: 'toggle',
                defaultValue: true,
                label: defineMessage({
                    defaultMessage: 'Scrollable',
                    description: 'Scrollable field label',
                }),
            },
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
        group: {
            label: defineMessage({
                defaultMessage: 'Map',
                description: 'Map screen group',
            }),
            order: 6,
        },
        title: defineMessage({
            defaultMessage: 'Map with image markers',
            description: 'MapImages screen title',
        }),
        component: MapImagesScreen,
        layouts: ['normal'],
        transforms,
        fields: [
            {
                name: 'title',
                type: 'heading-element',
                theme: {
                    textStyle: 'heading2',
                },
                label: defineMessage({
                    defaultMessage: 'Title',
                    description: 'Title field label',
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
                    description: 'Description field label',
                }),
            },
            {
                name: 'button',
                type: 'text-element',
                theme: {
                    textStyle: 'button',
                },
                label: defineMessage({
                    defaultMessage: 'Button',
                    description: 'Button field label',
                }),
            },
            {
                name: 'scrollable',
                type: 'toggle',
                defaultValue: true,
                label: defineMessage({
                    defaultMessage: 'Scrollable',
                    description: 'Scrollable field label',
                }),
            },
            {
                name: 'markers',
                type: 'markers-with-image',
                title: {
                    textStyle: 'heading3',
                },
                description: {
                    textStyle: 'text',
                },
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
