import { defineMessage } from 'react-intl';

import entry from './entry';

export default {
    ...entry,
    id: 'share-option',
    fields: [
        // ...entry.fields,
        {
            name: 'label',
            type: 'text',
            label: defineMessage({
                defaultMessage: 'Label',
                description: 'Field label',
            }),
        },
    ]
};
