import { defineMessage } from 'react-intl';

import TitleScreen from './Title';
import TitleSubtitleScreen from './TitleSubtitle';
import TitleSubtitleCreditsScreen from './TitleSubtitleCredits';
import * as transforms from './transforms/index';

export default [
    {
        id: 'title',
        type: 'screen',
        group: {
            label: defineMessage({
                defaultMessage: 'Title',
                description: 'Title screen group',
            }),
            order: 1,
        },
        title: defineMessage({
            defaultMessage: 'Title',
            description: 'Title screen title',
        }),
        component: TitleScreen,
        layouts: ['top', 'middle', 'bottom'],
        transforms,
        fields: [
            {
                name: 'layout',
                type: 'screen-layout',
                defaultValue: 'top',
                label: defineMessage({
                    defaultMessage: 'Layout',
                    description: 'Layout field label',
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
                name: 'background',
                type: 'background',
                label: defineMessage({
                    defaultMessage: 'Background',
                    description: 'Background field label',
                }),
            },
            {
                name: 'link',
                type: 'swipe-up-link',
                label: defineMessage({
                    defaultMessage: 'Swipe-up link',
                    description: 'Swipe-up link field label',
                }),
            },
        ],
    },
    {
        id: 'title-subtitle',
        type: 'screen',
        group: {
            label: defineMessage({
                defaultMessage: 'Title',
                description: 'Title screen group',
            }),
            order: 1,
        },
        title: defineMessage({
            defaultMessage: 'Title with subtitle',
            description: 'TitleSubtitle screen title',
        }),
        component: TitleSubtitleScreen,
        layouts: ['top', 'middle', 'bottom', 'split'],
        transforms,
        fields: [
            {
                name: 'layout',
                type: 'screen-layout',
                defaultValue: 'top',
                label: defineMessage({
                    defaultMessage: 'Layout',
                    description: 'Layout field label',
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
                name: 'subtitle',
                type: 'heading-element',
                theme: {
                    textStyle: 'heading2',
                },
                label: defineMessage({
                    defaultMessage: 'Subtitle',
                    description: 'Subtitle field label',
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
                name: 'link',
                type: 'swipe-up-link',
                label: defineMessage({
                    defaultMessage: 'Swipe-up link',
                    description: 'Swipe-up link field label',
                }),
            },
        ],
    },
    {
        id: 'title-subtitle-credits',
        type: 'screen',
        group: {
            label: defineMessage({
                defaultMessage: 'Title',
                description: 'Title screen group',
            }),
            order: 1,
        },
        title: defineMessage({
            defaultMessage: 'Title with subtitle and credits',
            description: 'TitleSubtitleCredits screen title',
        }),
        component: TitleSubtitleCreditsScreen,
        layouts: ['top', 'middle', 'bottom', 'split-top', 'split-bottom'],
        transforms,
        fields: [
            {
                name: 'layout',
                type: 'screen-layout',
                defaultValue: 'top',
                label: defineMessage({
                    defaultMessage: 'Layout',
                    description: 'Layout field label',
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
                name: 'subtitle',
                type: 'heading-element',
                theme: {
                    textStyle: 'heading2',
                },
                label: defineMessage({
                    defaultMessage: 'Subtitle',
                    description: 'Subtitle field label',
                }),
            },
            {
                name: 'credits',
                type: 'text-element',
                theme: {
                    textStyle: 'text',
                },
                label: defineMessage({
                    defaultMessage: 'Credits',
                    description: 'Credits field label',
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
                name: 'link',
                type: 'swipe-up-link',
                label: defineMessage({
                    defaultMessage: 'Swipe-up link',
                    description: 'Swipe-up link field label',
                }),
            },
        ],
    },
];
