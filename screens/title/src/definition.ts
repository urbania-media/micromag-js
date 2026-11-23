import { defineMessage } from 'react-intl';

import TitleScreen from './Title';
import TitleSubtitleScreen from './TitleSubtitle';
import TitleSubtitleCreditsScreen from './TitleSubtitleCredits';
import TitleWithBoxScreen from './TitleWithBox';

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
        // transforms,
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
                name: 'header',
                type: 'header',
                label: defineMessage({
                    defaultMessage: 'Header',
                    description: 'Field label',
                }),
                theme: {
                    badge: {
                        label: {
                            textStyle: 'badge',
                        },
                        boxStyle: 'badge',
                    },
                },
            },
            {
                name: 'footer',
                type: 'footer',
                label: defineMessage({
                    defaultMessage: 'Footer',
                    description: 'Field label',
                }),
                theme: {
                    callToAction: {
                        label: {
                            textStyle: 'cta',
                        },
                        boxStyle: 'cta',
                    },
                },
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
        // transforms,
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
                name: 'header',
                type: 'header',
                label: defineMessage({
                    defaultMessage: 'Header',
                    description: 'Field label',
                }),
                theme: {
                    badge: {
                        label: {
                            textStyle: 'badge',
                        },
                        boxStyle: 'badge',
                    },
                },
            },
            {
                name: 'footer',
                type: 'footer',
                label: defineMessage({
                    defaultMessage: 'Footer',
                    description: 'Field label',
                }),
                theme: {
                    callToAction: {
                        label: {
                            textStyle: 'cta',
                        },
                        boxStyle: 'cta',
                    },
                },
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
        // transforms,
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
                name: 'header',
                type: 'header',
                label: defineMessage({
                    defaultMessage: 'Header',
                    description: 'Field label',
                }),
                theme: {
                    badge: {
                        label: {
                            textStyle: 'badge',
                        },
                        boxStyle: 'badge',
                    },
                },
            },
            {
                name: 'footer',
                type: 'footer',
                label: defineMessage({
                    defaultMessage: 'Footer',
                    description: 'Field label',
                }),
                theme: {
                    callToAction: {
                        label: {
                            textStyle: 'cta',
                        },
                        boxStyle: 'cta',
                    },
                },
            },
        ],
    },
    {
        id: 'title-with-box',
        type: 'screen',
        group: {
            label: defineMessage({
                defaultMessage: 'Title',
                description: 'Title screen group',
            }),
            order: 1,
        },
        title: defineMessage({
            defaultMessage: 'Title with box',
            description: 'Dcreen title',
        }),
        component: TitleWithBoxScreen,
        layouts: ['top', 'middle', 'bottom', 'split-top', 'split-bottom'],
        // transforms,
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
                name: 'description',
                type: 'text-element',
                theme: {
                    textStyle: 'text',
                },
                label: defineMessage({
                    defaultMessage: 'Description',
                    description: 'Field label',
                }),
            },
            {
                type: 'fields',
                isList: true,
                label: defineMessage({
                    defaultMessage: 'Styles',
                    description: 'Field label',
                }),
                fields: [
                    {
                        name: 'boxStyle',
                        type: 'box-style-form',
                        label: defineMessage({
                            defaultMessage: 'Box',
                            description: 'Field label',
                        }),
                    },
                ],
            },
            {
                name: 'background',
                type: 'background',
                label: defineMessage({
                    defaultMessage: 'Background',
                    description: 'Field label',
                }),
            },
            {
                name: 'header',
                type: 'header',
                label: defineMessage({
                    defaultMessage: 'Header',
                    description: 'Field label',
                }),
                theme: {
                    badge: {
                        label: {
                            textStyle: 'badge',
                        },
                        boxStyle: 'badge',
                    },
                },
            },
            {
                name: 'footer',
                type: 'footer',
                label: defineMessage({
                    defaultMessage: 'Footer',
                    description: 'Field label',
                }),
                theme: {
                    callToAction: {
                        label: {
                            textStyle: 'cta',
                        },
                        boxStyle: 'cta',
                    },
                },
            },
        ],
    },
];
