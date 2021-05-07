import { defineMessage } from 'react-intl';

import Conversation from '../components/Conversation';

export default {
    id: 'conversation',
    component: Conversation,
    fields: [
        {
            name: 'speakers',
            type: 'speakers',            
            label: defineMessage({
                defaultMessage: 'Speakers',
                description: 'Speakers field label',
            }),    
        },
        {
            name: 'messages',
            type: 'messages',     
            label: defineMessage({
                defaultMessage: 'Messages',
                description: 'Messages field label',
            }),          
        },
        {
            name: 'textStyle',
            type: 'text-style',      
            label: defineMessage({
                defaultMessage: 'Text style',
                description: 'Text style field label',
            }),  
        },
    ]
};
