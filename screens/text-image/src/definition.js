import { defineMessage } from 'react-intl';
import TextImage from './TextImage';

export default {
    id: 'text-image',
    type: 'screen',
    title: defineMessage({
        defaultMessage: 'Video',
        description: 'Video screen title',
    }),
    component: TextImage,
    layouts: [
        'top',
        'top-reverse',
        'center',
        'center-reverse',        
        'bottom',
        'bottom-reverse',        
        'split',
        'split-reverse',
    ],
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
            name: 'text',
            type: 'text',
            label: defineMessage({
                defaultMessage: 'Text',
                description: 'Text field label',
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
            name: 'background',
            type: 'background',
            label: defineMessage({
                defaultMessage: 'Background',
                description: 'Background field label',
            }),
        },
    ],
};
