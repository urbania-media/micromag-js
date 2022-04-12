import { defineMessage } from 'react-intl';
import UrbaniaArticleScreen from './UrbaniaArticle';
import * as transforms from './transforms/index';

export default {
    id: 'urbania-article',
    type: 'screen',
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
    layouts: [],
    transforms,
    fields: [
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
                label: {
                    textStyle: 'heading2',
                },
            },
        },
    ],
};
