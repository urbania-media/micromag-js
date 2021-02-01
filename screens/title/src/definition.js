import { defineMessage } from 'react-intl';

import TitleScreen from './Title';
import TitleSubtitleScreen from './TitleSubtitle';
import TitleSubtitleCreditsScreen from './TitleSubtitleCredits';
import * as transforms from './transforms/index';

export default [
    {
        id: 'title',
        type: 'screen',
        group: defineMessage({
            defaultMessage: 'Title',
            description: 'Title screen group',
        }),
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
        ],
    },
    {
        id: 'title-subtitle',
        type: 'screen',
        group: defineMessage({
            defaultMessage: 'Title',
            description: 'Title screen group',
        }),
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
        ],
    },
    {
        id: 'title-subtitle-credits',
        type: 'screen',
        group: defineMessage({
            defaultMessage: 'Title',
            description: 'Title screen group',
        }),
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
                    textStyle: 'heading3',
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
        ],
    },
];
