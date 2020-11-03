import { defineMessage } from 'react-intl';
import Timeline from './Timeline';
import TimelineIllustrated from './TimelineIllustrated';

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
        component: Timeline,
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
                type: 'items',
                label: defineMessage({
                    defaultMessage: 'Items',
                    description: 'Items field label',
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
        component: TimelineIllustrated,
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
                type: 'items',
                label: defineMessage({
                    defaultMessage: 'Items',
                    description: 'Items field label',
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
