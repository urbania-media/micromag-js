import { defineMessage } from 'react-intl';
import GalleryFeedScreen from './GalleryFeed';
import GalleryFeedLegendsScreen from './GalleryFeedLegends';

export default [
    {
        id: 'gallery-feed',
        type: 'screen',
        group: defineMessage({
            defaultMessage: 'Images',
            description: 'Images screen group',
        }),
        title: defineMessage({
            defaultMessage: 'GalleryFeed',
            description: 'GalleryFeed screen title',
        }),
        component: GalleryFeedScreen,
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
            // Array of {image}
            {
                name: 'images',
                type: 'images',
                label: defineMessage({
                    defaultMessage: 'Images',
                    description: 'Images field label',
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
        id: 'gallery-feed-legends',
        type: 'screen',
        group: defineMessage({
            defaultMessage: 'Images',
            description: 'Images screen group',
        }),
        title: defineMessage({
            defaultMessage: 'GalleryFeedLegends',
            description: 'GalleryFeedLegends screen title',
        }),
        component: GalleryFeedLegendsScreen,
        layouts: ['normal', 'reverse'],
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
                // Array of {image, legend}
                name: 'images',
                type: 'images',
                label: defineMessage({
                    defaultMessage: 'Images (with legend)',
                    description: 'Images field label (with legend)',
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
