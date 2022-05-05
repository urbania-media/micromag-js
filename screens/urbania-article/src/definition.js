import { defineMessage } from 'react-intl';
import UrbaniaLoaderScreen from './UrbaniaLoader';

// import * as transforms from './transforms/index';

export default {
    id: 'urbania-article',
    type: 'screen',
    namespaces: ['urbania'],
    group: {
        label: defineMessage({
            defaultMessage: 'Urbania',
            description: 'Urbania screen group',
        }),
        order: 10,
    },
    title: defineMessage({
        defaultMessage: 'Urbania article',
        description: 'Urbania screen title',
    }),
    component: UrbaniaLoaderScreen,
    fields: [
        {
            name: 'url',
            type: 'url',
            label: defineMessage({
                defaultMessage: 'Url',
                description: 'Url field label',
            }),
        },
        {
            name: 'articleType',
            type: 'select',
            label: defineMessage({
                defaultMessage: 'Type',
                description: 'Type field label',
            }),
            options: [
                {
                    value: 'article',
                    label: defineMessage({
                        defaultMessage: 'Article',
                        description: 'Type field label',
                    }),
                },
                {
                    value: 'video',
                    label: defineMessage({
                        defaultMessage: 'Video',
                        description: 'Type field label',
                    }),
                },
            ],
        },
        {
            name: 'overTitle',
            type: 'heading-element',
            defaultValue: { body: 'En vedette' },
            label: defineMessage({
                defaultMessage: 'Overtitle',
                description: 'Title field label',
            }),
        },
        {
            name: 'title',
            type: 'heading-element',
            label: defineMessage({
                defaultMessage: 'Title',
                description: 'Title field label',
            }),
        },
        {
            name: 'author',
            type: 'author-element',
            label: defineMessage({
                defaultMessage: 'Author',
                description: 'Author field label',
            }),
        },
        {
            name: 'sponsor',
            type: 'heading-element',
            label: defineMessage({
                defaultMessage: 'Sponsor',
                description: 'Title field label',
            }),
        },
        {
            name: 'sponsorColor',
            type: 'color',
            label: defineMessage({
                defaultMessage: 'Sponsor color',
                description: 'Field label',
            }),
        },
        {
            name: 'image',
            type: 'visual',
            label: defineMessage({
                defaultMessage: 'Image',
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
            name: 'callToAction',
            type: 'call-to-action',
            theme: {
                boxStyle: 'cta',
                label: {
                    textStyle: 'cta',
                },
            },
        },
    ],
};
