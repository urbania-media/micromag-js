import { defineMessage } from 'react-intl';

import GalleryScreen from './Gallery';
import GalleryCaptionsScreen from './GalleryCaptions';

export default [
    {
        id: 'gallery',
        type: 'screen',
        group: defineMessage({
            defaultMessage: 'Images',
            description: 'Images screen group',
        }),
        title: defineMessage({
            defaultMessage: 'Gallery',
            description: 'Gallery screen title',
        }),
        component: GalleryScreen,
        layouts: [
            // 2
            'two-vertical-equal',
            'two-vertical-top',
            'two-vertical-bottom',
            // 3
            'three-vertical',
            'one-two',
            'two-one',
            // 4
            'two-by-two',
            'four-vertical',
            'one-two-one',
            'four-mosaic',
            // 5
            'two-one-two',
            'one-two-two',
            'two-two-one',
            // 6
            'two-by-three',
            'one-one-two-two',
            'two-two-one-one',
        ],
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
        id: 'gallery-captions',
        type: 'screen',
        group: defineMessage({
            defaultMessage: 'Images',
            description: 'Images screen group',
        }),
        title: defineMessage({
            defaultMessage: 'GalleryCaptions',
            description: 'GalleryCaptions screen title',
        }),
        component: GalleryCaptionsScreen,
        layouts: [
            // 2
            'two-vertical-equal',
            'two-vertical-top',
            'two-vertical-bottom',
            // 3
            'three-vertical',
            'one-two',
            'two-one',
            // 4
            'two-by-two',
            'four-vertical',
            'one-two-one',
            'four-mosaic',
            // 5
            'two-one-two',
            'one-two-two',
            'two-two-one',
            // 6
            'two-by-three',
            'one-one-two-two',
            'two-two-one-one',
        ],
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
                type: 'images-with-captions',
                label: defineMessage({
                    defaultMessage: 'imagesWithCaptions',
                    description: 'imagesWithCaptions field label',
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
