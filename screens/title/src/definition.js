import { defineMessage } from 'react-intl';
import TitleScreen from './Title';
import TitleSubtitleScreen from './TitleSubtitle';
import TitleSubtitleCreditsScreen from './TitleSubtitleCredits';

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
                type: 'heading',
                label: defineMessage({
                    defaultMessage: 'Title',
                    description: 'Title field label',
                }),
            },
            {
                name: 'markers',
                type: 'markers',
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
            defaultMessage: 'TitleSubtitle',
            description: 'TitleSubtitle screen title',
        }),
        component: TitleSubtitleScreen,
        layouts: ['top', 'middle', 'bottom', 'split'],
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
                type: 'heading',
                label: defineMessage({
                    defaultMessage: 'Title',
                    description: 'Title field label',
                }),
            },
            {
                name: 'subtitle',
                type: 'heading',
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
            defaultMessage: 'TitleSubtitleCredits',
            description: 'TitleSubtitleCredits screen title',
        }),
        component: TitleSubtitleCreditsScreen,
        layouts: ['top', 'middle', 'bottom', 'split-top', 'split-bottom'],
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
                type: 'heading',
                label: defineMessage({
                    defaultMessage: 'Title',
                    description: 'Title field label',
                }),
            },
            {
                name: 'subtitle',
                type: 'heading',
                label: defineMessage({
                    defaultMessage: 'Subtitle',
                    description: 'Subtitle field label',
                }),
            },
            {
                name: 'credits',
                type: 'text',
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
