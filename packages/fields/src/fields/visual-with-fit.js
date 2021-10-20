import { defineMessage } from 'react-intl';
import Visual from '../components/Visual';

export default {
    id: 'visual-with-fit',
    component: Visual,
    media: true,
    settings: [
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
};
