import { defineMessage } from 'react-intl';

import ContributionScreen from './Contribution';

export default {
    id: 'contribution',
    type: 'screen',
    group: {
        label: defineMessage({
            defaultMessage: 'Questions',
            description: 'Questions screen group',
        }),
        order: 7,
    },
    title: defineMessage({
        defaultMessage: 'Contribution',
        description: 'Contribution screen title',
    }),
    component: ContributionScreen,
    layouts: ['top', 'middle', 'bottom'],
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
            name: 'title',
            type: 'heading-element',
            theme: {
                textStyle: 'heading2',
            },
            label: defineMessage({
                defaultMessage: 'Title',
                description: 'Title field label',
            }),
        },
        {
            name: 'name',
            type: 'input-element',
            theme: {
                textStyle: 'text',
            },
            label: defineMessage({
                defaultMessage: 'Name',
                description: 'Name field label',
            }),
        },
        {
            name: 'message',
            type: 'input-element',
            theme: {
                textStyle: 'text',
            },
            label: defineMessage({
                defaultMessage: 'Message',
                description: 'Message field label',
            }),
        },
        {
            name: 'submit',
            type: 'text-element',
            theme: {
                textStyle: 'button',
            },
            label: defineMessage({
                defaultMessage: 'Submit',
                description: 'Submit field label',
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
