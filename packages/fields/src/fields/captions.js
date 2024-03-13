import { defineMessage } from 'react-intl';

export default {
    id: 'captions',
    isList: true,
    fields: [
        {
            name: 'media',
            type: 'closed-captions',
            label: defineMessage({
                defaultMessage: 'Closed captions file',
                description: 'Field label',
            }),
        },
        {
            name: 'textStyle',
            type: 'text-style-form',
            excludedFields: ['link', 'highlight'],
            label: defineMessage({
                defaultMessage: 'Text style',
                description: 'Field label',
            }),
        },
        {
            name: 'boxStyle',
            type: 'box-style-form',
            label: defineMessage({
                defaultMessage: 'Box style',
                description: 'Field label',
            }),
        },
    ],
};
