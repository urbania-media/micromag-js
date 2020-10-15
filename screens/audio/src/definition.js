import { defineMessage } from 'react-intl';
import Audio from './Audio';

export default {
    id: 'audio',
    type: 'screen',
    title: defineMessage({
        defaultMessage: 'Audio',
        description: 'Audio screen title',
    }),
    component: Audio,
    layouts: ['center', 'top', 'bottom', 'around'],
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
            name: 'audio',
            type: 'audio',
            label: defineMessage({
                defaultMessage: 'Audio',
                description: 'Audio field label',
            }),
        },
        {
            name: 'image',
            type: 'image',
            label: defineMessage({
                defaultMessage: 'Image',
                description: 'Image field label',
            }),
        },
        {
            name: 'text',
            type: 'text',
            label: defineMessage({
                defaultMessage: 'Text',
                description: 'Text field label',
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
