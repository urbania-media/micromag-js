import { defineMessage } from 'react-intl';
import FieldWithForm from '../components/FieldWithForm';

export default {
    id: 'marker-with-image',
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
            name: 'image',
            type: 'image',
            label: defineMessage({
                defaultMessage: 'Image',
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
        },
    ]
};
