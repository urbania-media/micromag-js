import { defineMessage } from 'react-intl';
import TwoImages from './TwoImages';

export default {
    id: 'text-image',
    type: 'screen',
    title: defineMessage({
        defaultMessage: 'Video',
        description: 'Video screen title',
    }),
    component: TwoImages,
    layouts: ['top', 'center', 'bottom', 'split'],
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
            name: 'image',
            type: 'image',
            label: defineMessage({
                defaultMessage: 'Image',
                description: 'Image field label',
            }),
        },
        {
            name: 'image2',
            type: 'image',
            label: defineMessage({
                defaultMessage: 'Second Image',
                description: 'Second Image field label',
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
