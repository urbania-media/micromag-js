import { defineMessage } from 'react-intl';

import GalleryFeedScreen from './GalleryFeed';
import GalleryFeedCaptionsScreen from './GalleryFeedCaptions';
import * as transforms from './transforms/index';

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
        transforms,
        fields: [
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
            {
                name: 'callToAction',
                type: 'call-to-action',
                theme: {
                    label: {
                        textStyle: 'heading2',
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
        transforms,
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
                type: 'images-with-caption',
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
                name: 'background',
                type: 'background',
                label: defineMessage({
                    defaultMessage: 'Background',
                    description: 'Background field label',
                }),
            },
            {
                name: 'callToAction',
                type: 'call-to-action',
                theme: {
                    label: {
                        textStyle: 'heading2',
                    },
                },
            },
        ],
    },
];
