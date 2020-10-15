import { defineMessage } from 'react-intl';
import Image from './Image';

export default {
    id: 'image',
    type: 'screen',
    title: defineMessage({
        defaultMessage: 'Image',
        description: 'Image screen title'
    }),
    component: Image,
    layouts: ['center', 'top', 'bottom'],
    fields: [
        {
            name: 'layout',
            type: 'screen-layout',
            label: defineMessage({
                defaultMessage: 'Layout',
                description: 'Layout field label'
            }),
        },
        {
            name: 'image',
            type: 'image',
            label: defineMessage({
                defaultMessage: 'Image',
                description: 'Image field label'
            }),
        },
        {
            name: 'text',
            type: 'text',
            label: defineMessage({
                defaultMessage: 'Text',
                description: 'Text field label'
            }),
        },
        {
            name: 'background',
            type: 'background',
            label: defineMessage({
                defaultMessage: 'Background',
                description: 'Background field label'
            }),
        },
    ],
};
