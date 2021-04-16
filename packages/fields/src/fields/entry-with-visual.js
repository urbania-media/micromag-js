import { defineMessage } from 'react-intl';

import entry from './entry';

export default {
    ...entry,
    id: 'entry-with-visual',
    fields: [
        ...entry.fields,
        {
            name: 'image',
            type: 'visual',
            label: defineMessage({
                defaultMessage: 'Image',
                description: 'Field label',
            }),
        },
    ]
};
