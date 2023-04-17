import { defineMessage } from 'react-intl';

import ImageScreen from './Image';
import ImageLegendScreen from './ImageLegend';
import ImageTextScreen from './ImageText';
import ImageTitleScreen from './ImageTitle';
import ImageTitleTextScreen from './ImageTitleText';
import * as transforms from './transforms/index';

export default [
    {
        id: 'image',
        type: 'screen',
        group: {
            label: defineMessage({
                defaultMessage: 'Images',
                description: 'Images screen group',
            }),
            order: 4,
        },
        title: defineMessage({
            defaultMessage: 'Image',
            description: 'Image screen title',
        }),
        component: ImageScreen,
        layouts: ['normal', 'fullscreen'],
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
                name: 'image',
                type: 'visual',
                label: defineMessage({
                    defaultMessage: 'Image',
                    description: 'Visual field label',
                }),
            },
            {
                name: 'imageFit',
                type: 'fit',
                defaultValue: 'cover',
                values: ['cover', 'contain'],
                label: defineMessage({
                    defaultMessage: 'Image fit',
                    description: 'Image fit field label',
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
            },
            {
                name: 'footer',
                type: 'footer',
                label: defineMessage({
                    defaultMessage: 'Footer',
                    description: 'Field label',
                }),
            },
        ],
    },
    {
        id: 'image-title',
        type: 'screen',
        group: {
            label: defineMessage({
                defaultMessage: 'Text and Images',
                description: 'Text and Images screen group',
            }),
            order: 3,
        },
        title: defineMessage({
            defaultMessage: 'Image with title',
            description: 'ImageTitle screen title',
        }),
        component: ImageTitleScreen,
        layouts: ['normal', 'reverse', 'card', 'card-reverse'],
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
                name: 'image',
                type: 'visual',
                label: defineMessage({
                    defaultMessage: 'Image',
                    description: 'Visual field label',
                }),
            },
            {
                name: 'imageFit',
                type: 'fit',
                defaultValue: 'cover',
                values: ['cover', 'contain'],
                label: defineMessage({
                    defaultMessage: 'Image fit',
                    description: 'Image fit field label',
                }),
            },
            {
                name: 'title',
                type: 'heading-element',
                inline: true,
                theme: {
                    textStyle: 'heading2',
                },
                label: defineMessage({
                    defaultMessage: 'Title',
                    description: 'Title field label',
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
                    boxStyle: 'cta',
                    label: {
                        textStyle: 'cta',
                    },
                },
            },
            {
                name: 'shareIncentive',
                type: 'share-incentive',
            },
        ],
    },
    {
        id: 'image-text',
        type: 'screen',
        group: {
            label: defineMessage({
                defaultMessage: 'Text and Images',
                description: 'Text and Images screen group',
            }),
            order: 3,
        },
        title: defineMessage({
            defaultMessage: 'Image with text',
            description: 'ImageText screen title',
        }),
        component: ImageTextScreen,
        layouts: ['normal', 'reverse', 'card', 'card-reverse'],
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
                name: 'image',
                type: 'visual',
                label: defineMessage({
                    defaultMessage: 'Image',
                    description: 'Visual field label',
                }),
            },
            {
                name: 'imageFit',
                type: 'fit',
                defaultValue: 'cover',
                values: ['cover', 'contain'],
                label: defineMessage({
                    defaultMessage: 'Image fit',
                    description: 'Image fit field label',
                }),
            },
            {
                name: 'text',
                type: 'text-element',
                theme: {
                    textStyle: 'text',
                },
                label: defineMessage({
                    defaultMessage: 'Text',
                    description: 'Text field label',
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
                    boxStyle: 'cta',
                    label: {
                        textStyle: 'cta',
                    },
                },
            },
            {
                name: 'shareIncentive',
                type: 'share-incentive',
            },
        ],
    },
    {
        id: 'image-title-text',
        type: 'screen',
        group: {
            label: defineMessage({
                defaultMessage: 'Text and Images',
                description: 'Text and Images screen group',
            }),
            order: 3,
        },
        title: defineMessage({
            defaultMessage: 'Image with title and text',
            description: 'ImageTitleText screen title',
        }),
        component: ImageTitleTextScreen,
        layouts: ['normal', 'reverse', 'title-top', 'card', 'card-reverse'],
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
                name: 'image',
                type: 'visual',
                isHorizontal: false,
                label: defineMessage({
                    defaultMessage: 'Image',
                    description: 'Visual field label',
                }),
            },
            {
                name: 'imageFit',
                type: 'fit',
                defaultValue: 'cover',
                values: ['cover', 'contain'],
                label: defineMessage({
                    defaultMessage: 'Image fit',
                    description: 'Image fit field label',
                }),
            },
            {
                name: 'title',
                type: 'text-element',
                inline: true,
                theme: {
                    textStyle: 'heading2',
                },
                label: defineMessage({
                    defaultMessage: 'Title',
                    description: 'Title field label',
                }),
            },
            {
                name: 'text',
                type: 'text-element',
                theme: {
                    textStyle: 'text',
                },
                label: defineMessage({
                    defaultMessage: 'Text',
                    description: 'Text field label',
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
                    boxStyle: 'cta',
                    label: {
                        textStyle: 'cta',
                    },
                },
            },
            {
                name: 'shareIncentive',
                type: 'share-incentive',
            },
        ],
    },
    {
        id: 'image-legend',
        type: 'screen',
        group: {
            label: defineMessage({
                defaultMessage: 'Images',
                description: 'Images screen group',
            }),
            order: 4,
        },
        title: defineMessage({
            defaultMessage: 'Image with legend',
            description: 'ImageLegend screen title',
        }),
        component: ImageLegendScreen,
        layouts: ['normal', 'reverse', 'card', 'card-reverse'],
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
                name: 'image',
                type: 'visual',
                label: defineMessage({
                    defaultMessage: 'Image',
                    description: 'Visual field label',
                }),
            },
            {
                name: 'imageFit',
                type: 'fit',
                defaultValue: 'cover',
                values: ['cover', 'contain'],
                label: defineMessage({
                    defaultMessage: 'Image fit',
                    description: 'Image fit field label',
                }),
            },
            {
                name: 'legend',
                type: 'text-element',
                theme: {
                    textStyle: 'text',
                },
                label: defineMessage({
                    defaultMessage: 'Legend',
                    description: 'Legend field label',
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
                    boxStyle: 'cta',
                    label: {
                        textStyle: 'cta',
                    },
                },
            },
            {
                name: 'shareIncentive',
                type: 'share-incentive',
            },
        ],
    },
];
