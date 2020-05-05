import { schemas as messages } from './messages';

export default {
    $id: 'https://schemas.micromag.ca/0.1/elements/button.json',
    title: 'Button',
    type: 'object',
    component: 'element',
    intl: {
        title: messages.schemaTitle,
    },
    allOf: [
        {
            $ref: 'https://schemas.micromag.ca/0.1/elements/element.json',
        },
        {
            properties: {
                textStyle: {
                    $ref: 'https://schemas.micromag.ca/0.1/fields/text-style.json',
                    title: 'Text style',
                    setting: true,
                    intl: {
                        title: messages.textStyle,
                    },
                },
                borderStyle: {
                    $ref: 'https://schemas.micromag.ca/0.1/fields/border-style.json',
                    title: 'Border style',
                    setting: true,
                    intl: {
                        title: messages.borderStyle,
                    },
                },
                backgroundColor: {
                    $ref: 'https://schemas.micromag.ca/0.1/fields/color.json',
                    title: 'Background color',
                    setting: true,
                    intl: {
                        title: messages.backgroundColor,
                    },
                },
            },
        },
    ],
};
