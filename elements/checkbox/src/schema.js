import { schemas as messages } from './messages';

export default {
    $id: 'https://schemas.micromag.ca/0.1/elements/checkbox.json',
    title: 'Checkbox',
    type: 'object',
    allOf: [
        {
            $ref: 'https://schemas.micromag.ca/0.1/elements/element.json',
        },
        {
            properties: {
                checkboxStyle: {
                    $ref: 'https://schemas.micromag.ca/0.1/fields/checkbox-style.json',
                    title: 'Checkbox style',
                    intl: {
                        title: messages.checkboxStyle,
                    },
                },
            },
        },
    ],
};
