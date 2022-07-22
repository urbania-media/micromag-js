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
        order: 12, // @todo how?
    },
    title: defineMessage({
        defaultMessage: 'Share',
        description: 'Share screen title',
    }),
    component: ShareScreen,
    layouts: ['top', 'middle', 'bottom'],
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
            name: 'shareUrl',
            type: 'url',
            label: defineMessage({
                defaultMessage: 'Custom URL',
                description: 'Field label',
            }),
            help: defineMessage({
                defaultMessage: 'If this field is left empty, this Micromag\'s URL will be shared.',
                description: 'Field help text'
            }),
        },
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
            type: 'fields',
            isList: true,
            label: defineMessage({
                defaultMessage: 'Share Options',
                description: 'Field label',
            }),
            fields: [
                {
                    name: 'email',
                    type: 'toggle',
                    defaultValue: true,
                    label: defineMessage({
                        defaultMessage: 'Email',
                        description: 'Field label',
                    }),
                },
                {
                    name: 'facebook',
                    type: 'toggle',
                    defaultValue: true,
                    label: defineMessage({
                        defaultMessage: 'Facebook',
                        description: 'Field label',
                    }),
                },
                {
                    name: 'twitter',
                    type: 'toggle',
                    defaultValue: true,
                    label: defineMessage({
                        defaultMessage: 'Twitter',
                        description: 'Field label',
                    }),
                },
                {
                    name: 'linkedin',
                    type: 'toggle',
                    defaultValue: true,
                    label: defineMessage({
                        defaultMessage: 'LinkedIn',
                        description: 'Field label',
                    }),
                },
                {
                    name: 'facebookMessenger',
                    type: 'toggle',
                    defaultValue: true,
                    label: defineMessage({
                        defaultMessage: 'Facebook Messenger',
                        description: 'Field label',
                    }),
                },
                {
                    name: 'whatsapp',
                    type: 'toggle',
                    defaultValue: true,
                    label: defineMessage({
                        defaultMessage: 'Whatsapp',
                        description: 'Field label',
                    }),
                },
                {
                    name: 'copylink',
                    type: 'toggle',
                    defaultValue: true,
                    label: defineMessage({
                        defaultMessage: 'Link to copy',
                        description: 'Field label',
                    }),
                },
            ],
        },
        {
            name: 'buttonsTextStyle',
            type: 'text-style-form',
            label: defineMessage({
                defaultMessage: 'Buttons text',
                description: 'Field label',
            }),
        },
        {
            name: 'buttonsStyle',
            type: 'box-style-form',
            label: defineMessage({
                defaultMessage: 'Buttons',
                description: 'Field label',
            }),
        },
        // @todo: delete if unused (commented out june 6, 2022)
        // {
        //     name: 'centered',
        //     type: 'toggle',
        //     defaultValue: true,
        //     label: defineMessage({
        //         defaultMessage: 'Align to center',
        //         description: 'Field label',
        //     }),
        // },
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
