import { defineMessage } from 'react-intl';
import InputElement from '../components/InputElement';

export default {
    id: 'input-element',
    component: InputElement,
    settings: [
        {
            name: 'textStyle',
            type: 'text-style',
        },
        {
            name: 'backgroundColor',
            label: defineMessage({
                defaultMessage: 'Background color',
                description: 'Background color label',
            }),
            type: 'color'
        },
        {
            name: 'border',
            label: defineMessage({
                defaultMessage: 'Border',
                description: 'Border color label',
            }),
            type: 'border'
        }
    ]
};
