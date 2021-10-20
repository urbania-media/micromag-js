import { defineMessage } from 'react-intl';
import Visual from '../components/Visual';

export default {
    id: 'visual-with-fit',
    component: Visual,
    media: true,
    settings: [
        {
            type: 'fields',
            isList: true,
            fields: [
                {
                    name: 'fit',
                    type: 'fit',
                    values: ['cover', 'contain'],
                    defaultValue: 'cover',
                    label: defineMessage({
                        defaultMessage: 'Fit',
                        description: 'Field label',
                    }),
                },
            ],
        },
    ],
};
