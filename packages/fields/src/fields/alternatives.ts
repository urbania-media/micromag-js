import { defineMessage } from 'react-intl';

export default {
    id: 'alternatives',
    isList: true,
    fields: [
        {
            name: 'audio',
            type: 'audio-element',
            withToggle: true,
            label: defineMessage({
                defaultMessage: 'Audio',
                description: 'Field label',
            }),
            defaultValue: {
                autoPlay: true,
                withControls: true,
            }
        },
    ],
};
