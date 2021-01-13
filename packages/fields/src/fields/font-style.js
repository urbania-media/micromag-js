import { defineMessage } from 'react-intl';
import FontStyle from '../components/FontStyle';

export default {
    id: 'font-style',
    isList: true,
    component: FontStyle,
    fields: [
        {
            name: 'textStyle',
            type: 'text-style',
            label: defineMessage({
                defaultMessage: 'Text style',
                description: 'Field label',
            }),
            breadcrumbLabel: defineMessage({
                defaultMessage: 'Text style',
                description: 'Field label',
            }),
        },
    ],
};
