import { defineMessage } from 'react-intl';

export default {
    id: 'marker',
    component: 'field-with-form',
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
