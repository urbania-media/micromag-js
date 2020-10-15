import { defineMessage } from 'react-intl';
import Gallery from './Gallery';

export default {
    id: 'gallery',
    type: 'screen',
    title: defineMessage({
        defaultMessage: 'Gallery',
        description: 'Gallery screen title',
    }),
    component: Gallery,
    layouts: [
        'four-by-four',
        'one-plus-three',
        'one-plus-two',
        'six-by-two',
        'three-by-three',
        'two-by-two',
        'two-high',
        'two-plus-one',
        'two-wide',
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
            name: 'images',
            type: 'images',
            label: defineMessage({
                defaultMessage: 'Images',
                description: 'Images field label',
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
