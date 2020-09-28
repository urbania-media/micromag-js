import { defineMessages } from 'react-intl';

const messages = defineMessages({
    adFormatTitle: {
        id: 'schemas.ad-format.title',
        defaultMessage: 'Ad Format',
    },
});

export default {
    $id: 'https://schemas.micromag.ca/0.1/fields/ad-format.json',
    title: 'Ad Format',
    type: 'object',
    component: 'ad-format',
    intl: {
        title: messages.adFormatTitle,
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
