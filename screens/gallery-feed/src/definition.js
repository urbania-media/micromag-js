import { defineMessage } from 'react-intl';

import GalleryFeedScreen from './GalleryFeed';
import GalleryFeedCaptionsScreen from './GalleryFeedCaptions';
import * as transforms from './transforms/index';

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
        id: 'gallery-feed-captions',
        type: 'screen',
        group: defineMessage({
            defaultMessage: 'Images',
            description: 'Images screen group',
        }),
        title: defineMessage({
            defaultMessage: 'GalleryFeedCaptions',
            description: 'GalleryFeedCaptions screen title',
        }),
        component: GalleryFeedCaptionsScreen,
        layouts: ['normal', 'reverse'],
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
                name: 'images',
                type: 'images-with-caption',
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
        ],
    },
];
