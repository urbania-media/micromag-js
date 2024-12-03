import { defineMessage } from 'react-intl';

import GalleryFeedScreen from './GalleryFeed';
import GalleryFeedCaptionsScreen from './GalleryFeedCaptions';

export default [
    {
        id: 'gallery-feed',
        type: 'screen',
        group: {
            label: defineMessage({
                defaultMessage: 'Images',
                description: 'Images screen group',
            }),
            order: 4,
        },
        title: defineMessage({
            defaultMessage: 'Gallery Feed',
            description: 'Gallery Feed screen title',
        }),
        component: GalleryFeedScreen,
        layouts: ['normal'],
        // transforms,
        fields: [
            {
                name: 'images',
                type: 'visuals',
                label: defineMessage({
                    defaultMessage: 'Images',
                    description: 'Visuals field label',
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
            {
                name: 'header',
                type: 'header',
                label: defineMessage({
                    defaultMessage: 'Header',
                    description: 'Field label',
                }),
                theme: {
                    badge: {
                        label: {
                            textStyle: 'badge',
                        },
                        boxStyle: 'badge',
                    },
                },
            },
            {
                name: 'footer',
                type: 'footer',
                label: defineMessage({
                    defaultMessage: 'Footer',
                    description: 'Field label',
                }),
                theme: {
                    callToAction: {
                        label: {
                            textStyle: 'cta',
                        },
                        boxStyle: 'cta',
                    },
                },
            },
        ],
    },
    {
        id: 'gallery-feed-captions',
        type: 'screen',
        group: {
            label: defineMessage({
                defaultMessage: 'Images',
                description: 'Images screen group',
            }),
            order: 4,
        },
        title: defineMessage({
            defaultMessage: 'Gallery feed with captions',
            description: 'GalleryFeedCaptions screen title',
        }),
        component: GalleryFeedCaptionsScreen,
        layouts: ['normal', 'reverse'],
        // transforms,
        fields: [
            {
                name: 'layout',
                type: 'screen-layout',
                defaultValue: 'normal',
                label: defineMessage({
                    defaultMessage: 'Layout',
                    description: 'Layout field label',
                }),
            },
            {
                name: 'images',
                type: 'visuals-with-caption',
                theme: {
                    caption: {
                        textStyle: 'text',
                    },
                },
                label: defineMessage({
                    defaultMessage: 'Images',
                    description: 'Field label',
                }),
            },
            {
                name: 'imageCaptionStyle',
                type: 'text-style-form',
                label: defineMessage({
                    defaultMessage: 'Caption style',
                    description: 'Field label',
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
            {
                name: 'header',
                type: 'header',
                label: defineMessage({
                    defaultMessage: 'Header',
                    description: 'Field label',
                }),
                theme: {
                    badge: {
                        label: {
                            textStyle: 'badge',
                        },
                        boxStyle: 'badge',
                    },
                },
            },
            {
                name: 'footer',
                type: 'footer',
                label: defineMessage({
                    defaultMessage: 'Footer',
                    description: 'Field label',
                }),
                theme: {
                    callToAction: {
                        label: {
                            textStyle: 'cta',
                        },
                        boxStyle: 'cta',
                    },
                },
            },
        ],
    },
];
