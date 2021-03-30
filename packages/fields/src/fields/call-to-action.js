import { defineMessage } from 'react-intl';

import CallToAction from '../components/CallToAction';

export default {
    id: 'call-to-action',
    isList: true,
    component: CallToAction,
    fields: [
        {
            name: 'active',
            type: 'toggle',
            isHorizontal: true,
            label: defineMessage({
                defaultMessage: 'Active',
                description: 'Active label',
            }),            
        },
        {
            name: 'type',
            type: 'radios',            
            options: [
                {
                    value: 'swipe-up',
                    label: defineMessage({
                        defaultMessage: 'Swipe up',
                        description: 'Swipe up label',
                    }),
                },
                {
                    value: 'button',
                    label: defineMessage({
                        defaultMessage: 'Button',
                        description: 'Button label',
                    }),
                },
            ],
            firstOptionAsDefault: true,
            isHorizontal: true,
            label: defineMessage({
                defaultMessage: 'Type',
                description: 'Type label',
            }),
        },
        {
            name: 'url',
            type: 'text',            
            textOnly: true,
            isHorizontal: true,
            label: defineMessage({
                defaultMessage: 'Url',
                description: 'Url label',
            }),            
        },
        {
            name: 'label',
            type: 'text-element',
            label: defineMessage({
                defaultMessage: 'Label',
                description: 'Label label',
            }),            
        },        
    ],
};