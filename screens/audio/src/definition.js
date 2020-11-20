import { defineMessage } from 'react-intl';
import AudioScreen from './Audio';

export default {
    id: 'audio',
    type: 'screen',
    group: defineMessage({
        defaultMessage: 'Audio and Video',
        description: 'Audio and Video screen group',
    }),
    title: defineMessage({
        defaultMessage: 'Audio',
        description: 'Audio screen title',
    }),
    component: AudioScreen,
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
            type: 'text-element',
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
