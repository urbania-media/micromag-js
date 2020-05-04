import { schemas as messages } from './messages';

export default {
    $id: 'https://schemas.micromag.ca/0.1/elements/button.json',
    title: 'Button',
    type: 'object',
    allOf: [
        {
            $ref: 'https://schemas.micromag.ca/0.1/elements/element.json',
        },
        {
            properties: {
                buttonStyle: {
                    $ref: 'https://schemas.micromag.ca/0.1/fields/button-style.json',
                    title: 'Checkbox style',
                    intl: {
                        title: messages.checkboxStyle,
                    },
                },
            },
        },
    ],
};
