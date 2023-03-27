import { defineMessage } from 'react-intl';

import QuoteScreen from './Quote';
import * as transforms from './transforms/index';

export default {
    id: 'quote',
    type: 'screen',
    group: {
        label: defineMessage({
            defaultMessage: 'Text',
            description: 'Text screen group',
        }),
        order: 2,
    },
    title: defineMessage({
        defaultMessage: 'Quote',
        description: 'Quote screen title',
    }),
    component: QuoteScreen,
    layouts: ['top', 'middle', 'bottom', 'split'],
    transforms,
    fields: [
        {
            name: 'layout',
            type: 'screen-layout',
            defaultValue: 'top',
            label: defineMessage({
                defaultMessage: 'Layout',
                description: 'Layout field label',
            }),
        },
        {
            name: 'quote',
            type: 'heading-element',
            fieldType: 'multi',
            theme: {
                textStyle: 'heading2',
            },
            label: defineMessage({
                defaultMessage: 'Quote',
                description: 'Quote field label',
            }),
        },
        {
            name: 'author',
            type: 'text-element',
            theme: {
                textStyle: 'text',
            },
            label: defineMessage({
                defaultMessage: 'Author',
                description: 'Author field label',
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
        {
            name: 'callToAction',
            type: 'call-to-action',
            theme: {
                boxStyle: 'cta',
                label: {
                    textStyle: 'cta',
                },
            },
        },
        {
            name: 'shareIncentive',
            type: 'share-incentive',
        },
    ],
};
