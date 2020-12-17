import { defineMessage } from 'react-intl';
import TimelineScreen from './Timeline';
import TimelineIllustratedScreen from './TimelineIllustrated';

export default [
    {
        id: 'timeline',
        type: 'screen',
        group: defineMessage({
            defaultMessage: 'List',
            description: 'List screen group',
        }),
        title: defineMessage({
            defaultMessage: 'Timeline',
            description: 'Timeline screen title',
        }),
        component: TimelineScreen,
        layouts: ['normal'],
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
                name: 'items',
                type: 'entries',
                label: defineMessage({
                    defaultMessage: 'Entries',
                    description: 'Field label',
                }),
            },
            {
                name: 'bulletShape',
                type: 'radios',
                defaultValue: 'circle',
                options: [
                    {
                        value: 'circle',
                        label: 'Circle',
                    },
                    {
                        value: 'square',
                        label: 'Square',
                    },
                ],
                label: defineMessage({
                    defaultMessage: 'Bullet shape',
                    description: 'Field label',
                }),
            },
            {
                name: 'bulletFilled',
                type: 'toggle',
                defaultValue: false,
                label: defineMessage({
                    defaultMessage: 'Bullet filled',
                    description: 'Field label',
                }),
            },
            {
                name: 'bulletColor',
                type: 'color',
                defaultValue: '#FFFFFF',
                label: defineMessage({
                    defaultMessage: 'Bullet color',
                    description: 'Field label',
                }),
            },
            {
                name: 'lineColor',
                type: 'color',
                defaultValue: '#FFFFFF',
                label: defineMessage({
                    defaultMessage: 'Line color',
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
        ],
    },
    {
        id: 'timeline-illustrated',
        type: 'screen',
        group: defineMessage({
            defaultMessage: 'List',
            description: 'List screen group',
        }),
        title: defineMessage({
            defaultMessage: 'Timeline Illustrated',
            description: 'Timeline Illustrated screen title',
        }),
        component: TimelineIllustratedScreen,
        layouts: ['title-image-description', 'title-description-image', 'image-title-description'],
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
                name: 'items',
                type: 'entries-with-image',
                label: defineMessage({
                    defaultMessage: 'Entries',
                    description: 'Field label',
                }),
            },
            {
                name: 'bulletShape',
                type: 'radios',
                defaultValue: 'circle',
                options: [
                    {
                        value: 'circle',
                        label: 'Circle',
                    },
                    {
                        value: 'square',
                        label: 'Square',
                    },
                ],
                label: defineMessage({
                    defaultMessage: 'Bullet shape',
                    description: 'Field label',
                }),
            },
            {
                name: 'bulletFilled',
                type: 'toggle',
                defaultValue: false,
                label: defineMessage({
                    defaultMessage: 'Bullet filled',
                    description: 'Field label',
                }),
            },
            {
                name: 'bulletColor',
                type: 'color',
                defaultValue: '#FFFFFF',
                label: defineMessage({
                    defaultMessage: 'Bullet color',
                    description: 'Field label',
                }),
            },            
            {
                name: 'lineColor',
                type: 'color',
                defaultValue: '#FFFFFF',
                label: defineMessage({
                    defaultMessage: 'Line color',
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
        ],
    }
];
