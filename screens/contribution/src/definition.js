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
            defaultValue: 'top',
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
            defaultValue: {
                textStyle: {
                    color: { color: '#FFF', alpha: 1 },
                },
                buttonStyle: {
                    backgroundColor: { color: '#000', alpha: 1 },
                    borderRadius: 0,
                    borderWidth: 0,
                    borderStyle: 'solid',
                    borderColor: { color: '#FFF', alpha: 1 },
                },
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
            defaultValue: {
                textStyle: {
                    color: { color: '#FFF', alpha: 1 },
                },
                buttonStyle: {
                    backgroundColor: { color: '#000', alpha: 1 },
                    borderRadius: 0,
                    borderWidth: 0,
                    borderStyle: 'solid',
                    borderColor: { color: '#FFF', alpha: 1 },
                },
            },
            label: defineMessage({
                defaultMessage: 'Message',
                description: 'Message field label',
            }),
        },
        {
            name: 'submit',
            type: 'button-element',
            theme: {
                textStyle: 'button',
            },
            defaultValue: {
                textStyle: {
                    color: { color: '#FFF', alpha: 1 },
                },
                buttonStyle: {
                    backgroundColor: { color: '#000', alpha: 1 },
                    borderRadius: 0,
                    borderWidth: 2,
                    borderStyle: 'solid',
                    borderColor: { color: '#FFF', alpha: 1 },
                },
            },
            label: defineMessage({
                defaultMessage: 'Submit',
                description: 'Submit field label',
            }),
        },
        {
            name: 'nameStyle',
            type: 'item-text-style',  
            theme: {
                style: {
                    textStyle: 'heading2',
                },
            },          
            label: defineMessage({
                defaultMessage: 'Published name style',
                description: 'Published name style field label',
            }),
        },
        {
            name: 'messageStyle',
            type: 'item-text-style',
            theme: {
                style: {
                    textStyle: 'text',
                },
            },
            label: defineMessage({
                defaultMessage: 'Published message style',
                description: 'Published message style field label',
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
