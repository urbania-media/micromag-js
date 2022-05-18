import { defineMessage } from 'react-intl';
import ShareScreen from './Share';
import * as transforms from './transforms/index';

export default {
    id: 'share',
    type: 'screen',
    group: {
        label: defineMessage({
            defaultMessage: 'Share',
            description: 'Share screen group',
        }),
        order: 1,
    },
    title: defineMessage({
        defaultMessage: 'Share',
        description: 'Share screen title',
    }),
    component: ShareScreen,
    // layouts: ['top', 'middle', 'bottom'],
    transforms,
    fields: [
        // {
        //     name: 'layout',
        //     type: 'screen-layout',
        //     defaultValue: 'top',
        //     label: defineMessage({
        //         defaultMessage: 'Layout',
        //         description: 'Layout field label',
        //     }),
        // },
        {
            name: 'heading',
            type: 'heading-element',
            theme: {
                textStyle: 'heading2',
            },
            label: defineMessage({
                defaultMessage: 'Heading',
                description: 'Heading field label',
            }),
        },
        {
            name: 'options',
            type: 'share-options',
            label: defineMessage({
                defaultMessage: 'Sharing options',
                description: 'Share Options field label',
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
