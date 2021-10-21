import { defineMessage } from "react-intl";

export default {
    id: 'parameters',
    isList: true,
    fields: [
        {
            name: 'metadata',
            type: 'metadata',
            label: defineMessage({
                defaultMessage: 'Metadata',
                description: 'field label',
            }),
        },
    ],
};
