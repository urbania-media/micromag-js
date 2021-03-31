import { defineMessage } from 'react-intl';

import GalleryScreen from './Gallery';
import GalleryCaptionsScreen from './GalleryCaptions';
import * as transforms from './transforms/index';

export default [
    {
        id: 'gallery',
        type: 'screen',
        group: {
            label: defineMessage({
                defaultMessage: 'Images',
                description: 'Images screen group',
            }),
            order: 4,
        },
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
        transforms,
        fields: [
            {
                name: 'layout',
                type: 'screen-layout',
                defaultValue: 'two-vertical-equal',
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
            {
                name: 'callToAction',
                type: 'call-to-action',
            },
        ],
    },
    {
        id: 'gallery-captions',
        type: 'screen',
        group: {
            label: defineMessage({
                defaultMessage: 'Images',
                description: 'Images screen group',
            }),
            order: 4,
        },
        title: defineMessage({
            defaultMessage: 'Gallery with captions',
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
        transforms,
        fields: [
            {
                name: 'layout',
                type: 'screen-layout',
                defaultValue: 'two-vertical-equal',
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
            {
                name: 'callToAction',
                type: 'call-to-action',
            },
        ],
    },
];
