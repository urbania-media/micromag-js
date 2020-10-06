import { defineMessage } from 'react-intl';

export default {
    $id: 'https://schemas.micromag.ca/0.1/fields/ad-format.json',
    title: 'Ad Format',
    type: 'object',
    component: 'ad-format',
    intl: {
        title: defineMessage({
            defaultMessage: 'Ad Format',
        }),
    },
    properties: {
        name: {
            type: 'string',
            title: 'Nom',
        },
        width: {
            type: 'number',
            title: 'Largeur',
        },
        height: {
            type: 'number',
            title: 'Hauteur',
        },
    },
};
