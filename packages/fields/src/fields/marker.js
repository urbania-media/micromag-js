import { defineMessage } from 'react-intl';

import FieldWithForm from '../components/FieldWithForm';

export default {
    id: 'marker',
    component: FieldWithForm,
    labelPath: 'title.body',
    fields: [
        {
            name: 'title',
            type: 'heading-element',
            label: defineMessage({
                defaultMessage: 'Title',
                description: 'Field label',
            }),
        },
        {
            name: 'description',
            type: 'text-element',
            label: defineMessage({
                defaultMessage: 'Description',
                description: 'Field label',
            }),
        },
        {
            name: 'geoPosition',
            type: 'geo-position',
            label: defineMessage({
                defaultMessage: 'Position',
                description: 'Field label',
            }),
        }
    ]
};
