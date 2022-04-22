import { defineMessage } from 'react-intl';
import UrbaniaArticleScreen from './UrbaniaArticle';

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
        defaultMessage: 'Urbania article screen',
        description: 'Urbania screen title',
    }),
    component: UrbaniaArticleScreen,
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
            name: 'overTitle',
            type: 'heading-element',
            theme: {
                textStyle: 'heading2',
            },
            defaultValue: { body: 'En vedette' },
            label: defineMessage({
                defaultMessage: 'Overtitle',
                description: 'Title field label',
            }),
        },
        {
            name: 'title',
            type: 'heading-element',
            theme: {
                textStyle: 'heading1',
            },
            label: defineMessage({
                defaultMessage: 'Title',
                description: 'Title field label',
            }),
        },
        {
            name: 'author',
            type: 'author-element',
            theme: {
                textStyle: 'text',
            },
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
            name: 'image',
            type: 'visual',
            label: defineMessage({
                defaultMessage: 'Image',
                description: 'Visuals field label',
            }),
        },
        {
            name: 'video',
            type: 'video-element',
            theme: {
                color: 'primary',
            },
            defaultValue: {
                autoPlay: true,
            },
            label: defineMessage({
                defaultMessage: 'Video',
                description: 'Video field label',
            }),
        },
        {
            name: 'gotoNextScreenOnEnd',
            type: 'toggle',
            defaultValue: false,
            label: defineMessage({
                defaultMessage: 'Go to next screen on end',
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
                boxStyle: 'cta',
                label: {
                    textStyle: 'cta',
                },
            },
        },
    ],
};
