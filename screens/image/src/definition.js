import { defineMessage } from 'react-intl';
import ImageScreen from './Image';
import ImageTitleScreen from './ImageTitle';
import ImageTextScreen from './ImageText';
import ImageTitleTextScreen from './ImageTitleText';
import ImageLegendScreen from './ImageLegend';
import * as transforms from './transforms/index';

export default [
    {
        id: 'image',
        type: 'screen',
        group: defineMessage({
            defaultMessage: 'Images',
            description: 'Images screen group',
        }),
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
                label: defineMessage({
                    defaultMessage: 'Layout',
                    description: 'Layout field label',
                }),
            },
            {
                name: 'image',
                type: 'image',
                label: defineMessage({
                    defaultMessage: 'Image',
                    description: 'Image field label',
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
        id: 'image-title',
        type: 'screen',
        group: defineMessage({
            defaultMessage: 'Text and Images',
            description: 'Text and Images screen group',
        }),
        title: defineMessage({
            defaultMessage: 'ImageTitle',
            description: 'ImageTitle screen title',
        }),
        component: ImageTitleScreen,
        layouts: ['normal', 'reverse', 'card'],
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
                name: 'image',
                type: 'image',
                label: defineMessage({
                    defaultMessage: 'Image',
                    description: 'Image field label',
                }),
            },
            {
                name: 'title',
                type: 'text-element',
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
        id: 'image-text',
        type: 'screen',
        group: defineMessage({
            defaultMessage: 'Text and Images',
            description: 'Text and Images screen group',
        }),
        title: defineMessage({
            defaultMessage: 'ImageText',
            description: 'ImageText screen title',
        }),
        component: ImageTextScreen,
        layouts: ['normal', 'reverse', 'card'],
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
                name: 'image',
                type: 'image',
                label: defineMessage({
                    defaultMessage: 'Image',
                    description: 'Image field label',
                }),
            },
            {
                name: 'text',
                type: 'text-element',
                theme: {
                    textStyle: 'text',
                    textColor: 'primary',
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
        ],
    },
    {
        id: 'image-title-text',
        type: 'screen',
        group: defineMessage({
            defaultMessage: 'Text and Images',
            description: 'Text and Images screen group',
        }),
        title: defineMessage({
            defaultMessage: 'ImageTitleText',
            description: 'ImageTitleText screen title',
        }),
        component: ImageTitleTextScreen,
        layouts: ['normal', 'reverse', 'title-top', 'card'],
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
                name: 'image',
                type: 'image',
                isHorizontal: false,
                label: defineMessage({
                    defaultMessage: 'Image',
                    description: 'Image field label',
                }),
            },
            {
                name: 'title',
                type: 'text-element',
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
                name: 'text',
                type: 'text-element',
                theme: {
                    textStyle: 'text',
                    textColor: 'primary',
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
        ],
    },
    {
        id: 'image-legend',
        type: 'screen',
        group: defineMessage({
            defaultMessage: 'Images',
            description: 'Images screen group',
        }),
        title: defineMessage({
            defaultMessage: 'ImageLegend',
            description: 'ImageLegend screen title',
        }),
        component: ImageLegendScreen,
        layouts: ['normal', 'reverse', 'card'],
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
                name: 'image',
                type: 'image',
                label: defineMessage({
                    defaultMessage: 'Image',
                    description: 'Image field label',
                }),
            },
            {
                name: 'legend',
                type: 'text-element',
                theme: {
                    textStyle: 'text',
                    textColor: 'primary',
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
        ],
    },
];
