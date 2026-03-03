import { defineMessage } from 'react-intl';

import entry from './entry';

export default {
    ...entry,
    id: 'entry-with-image',
    fields: [
        ...entry.fields,
        {
            name: 'image',
            type: 'image',
            label: defineMessage({
                defaultMessage: 'Image',
                description: 'Field label',
            }),
        },
    ]
};
