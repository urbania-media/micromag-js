import { defineMessages } from 'react-intl';

const messages = defineMessages({
    borderStyleTitle: {
        id: 'schemas.border-style.title',
        defaultMessage: 'Border',
    },
    borderWidthTitle: {
        id: 'schemas.border-style.width',
        defaultMessage: 'Width',
    },
    borderTypeTitle: {
        id: 'schemas.border-style.type',
        defaultMessage: 'Style',
    },
    borderColorTitle: {
        id: 'schemas.border-style.color',
        defaultMessage: 'Color',
    },
    borderRadiusTitle: {
        id: 'schemas.border-style.radius',
        defaultMessage: 'Radius',
    },
});

export default {
    $id: 'https://schemas.micromag.ca/0.1/fields/border-style.json',
    title: 'Border',
    type: 'object',
    component: 'border-style',
    intl: {
        title: messages.borderStyleTitle,
    },
    properties: {
        width: {
            $ref: 'https://schemas.micromag.ca/0.1/fields/border-width.json',
            intl: {
                title: messages.borderWidthTitle,
            },
        },
        style: {
            $ref: 'https://schemas.micromag.ca/0.1/fields/border-type.json',
            intl: {
                title: messages.borderTypeTitle,
            },
        },
        color: {
            $ref: 'https://schemas.micromag.ca/0.1/fields/color.json',
            intl: {
                title: messages.borderColorTitle,
            },
        },
        radius: {
            $ref: 'https://schemas.micromag.ca/0.1/fields/border-radius.json',
            title: 'Radius',
            isHorizontal: true,
            intl: {
                title: messages.borderRadiusTitle,
            },
        },
    },
};
