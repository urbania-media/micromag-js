import { defineMessage } from 'react-intl';

import FieldWithForm from '../components/FieldWithForm';

export default {
    id: 'quiz-answer',
    component: FieldWithForm,
    labelPath: 'label.body',
    fields: [
        {
            name: 'label',
            type: 'text-element',
            textOnly: true,
            label: defineMessage({
                defaultMessage: 'Label',
                description: 'Field label',
            }),
        },
        {
            name: 'good',
            type: 'toggle',
            label: defineMessage({
                defaultMessage: 'Good answer',
                description: 'Field label',
            }),
        }
    ]
};
