import { defineMessage } from 'react-intl';
import Gallery from './Gallery';
import GalleryLegends from './GalleryLegends';

export default [
    {
        id: 'gallery',
        type: 'screen',
        title: defineMessage({
            defaultMessage: 'Gallery',
            description: 'Gallery screen title',
        }),
        component: Gallery,
        layouts: [
            // 2 
            'two-vertical',
            'two-horizontal',
            // 3
            'one-plus-two',
            'two-plus-one',
            'three-vertical',
            // 4
            'four-mosaic',
            'four-mosaic-reverse',
            'two-by-two',
            'one-plus-three',
            // 5
            'two-wide-plus-three',
            'three-plus-two-wide',
            // 6
            'two-by-three',
            'three-by-two',
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
        id: 'gallery-legends',
        type: 'screen',
        title: defineMessage({
            defaultMessage: 'GalleryLegends',
            description: 'GalleryLegends screen title',
        }),
        component: GalleryLegends,
        layouts: [
            // 2 
            'two-vertical',
            'two-horizontal',
            // 3
            'one-plus-two',
            'two-plus-one',
            'three-vertical',
            // 4
            'four-mosaic',
            'four-mosaic-reverse',
            'two-by-two',
            'one-plus-three',
            // 5
            'two-wide-plus-three',
            'three-plus-two-wide',
            // 6
            'two-by-three',
            'three-by-two',
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
                type: 'imagesWithLegends',
                label: defineMessage({
                    defaultMessage: 'imagesWithLegends',
                    description: 'imagesWithLegends field label',
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
    }
];
