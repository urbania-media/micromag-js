import { defineMessage } from 'react-intl';

import MapScreen from './Map';
import MapImagesScreen from './MapImages';
import * as transforms from './transforms/index';

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
        transforms,
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
                name: 'title',
                type: 'heading-element',
                theme: {
                    textStyle: 'heading1',
                    textColor: 'primary',
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
                    textColor: 'primary',
                },
                label: defineMessage({
                    defaultMessage: 'Description',
                    description: 'Description field label',
                }),
            },
            {
                name: 'button',
                type: 'text-element',
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
            defaultMessage: 'Map with image markers',
            description: 'MapImages screen title',
        }),
        component: MapImagesScreen,
        layouts: ['normal'],
        transforms,
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
                name: 'title',
                type: 'heading-element',
                theme: {
                    textStyle: 'heading1',
                    textColor: 'primary',
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
                    textColor: 'primary',
                },
                label: defineMessage({
                    defaultMessage: 'Description',
                    description: 'Description field label',
                }),
            },
            {
                name: 'button',
                type: 'text-element',
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
