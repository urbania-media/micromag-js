import { defineMessage } from 'react-intl';
import Ad from './Ad';

export default {
    id: 'ad',
    type: 'screen',
    title: defineMessage({
        defaultMessage: 'Ad',
        description: 'Ad screen title'
    }),
    component: Ad,
    layouts: [
        'center',
        'top',
        'bottom',
        'full',
        'center-left',
        'center-right',
        'top-left',
        'top-right',
        'bottom-left',
        'bottom-right',
    ],
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
            name: 'link',
            type: 'link',
            label: defineMessage({
                defaultMessage: 'Link',
                description: 'Link field label'
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
