import { defineMessage } from 'react-intl';
import SwipeUpLink from '../components/SwipeUpLink';

export default {
    id: 'swipe-up-link',
    isList: true,
    component: SwipeUpLink,
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
        {
            name: 'tapOnly',
            type: 'toggle',
            isHorizontal: true,
            label: defineMessage({
                defaultMessage: 'Tap only',
                description: 'Tap only label',
            }),            
        },
    ],
};