import { defineMessage } from 'react-intl';
import GalleryFeed from './GalleryFeed';

export default {
    id: 'gallery-feed',
    type: 'screen',
    title: defineMessage({
        defaultMessage: 'GalleryFeed',
        description: 'GalleryFeed screen title',
    }),
    component: GalleryFeed,
    layouts: ['single', 'double', 'triple', 'mixed-double', 'mixed-triple'],
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
            name: 'spacing',
            type: 'number',
            label: defineMessage({
                defaultMessage: 'Spacing',
                description: 'Spacing field label',
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
};
