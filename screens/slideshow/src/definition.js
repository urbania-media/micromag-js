import { defineMessage } from 'react-intl';
import Slideshow from './Slideshow';

export default {
    id: 'slideshow',
    type: 'screen',
    group: defineMessage({
        defaultMessage: 'Images',
        description: 'Images screen group',
    }),
    title: defineMessage({
        defaultMessage: 'Slideshow',
        description: 'Slideshow screen title',
    }),
    component: Slideshow,
    layouts: ['center'],
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
            name: 'slides',
            type: 'slides',
            label: defineMessage({
                defaultMessage: 'Slides',
                description: 'Slides field label',
            }),
        },
        {
            name: 'button',
            type: 'button',
            label: defineMessage({
                defaultMessage: 'Button style',
                description: 'Button style field label',
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
};
