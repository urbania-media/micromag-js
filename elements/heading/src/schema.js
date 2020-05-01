import { schemas as messages } from './messages';

export default {
    $id: 'https://schemas.micromag.ca/0.1/elements/heading.json',
    title: 'Heading',
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
                body: {
                    type: 'string',
                    component: 'text',
                },
                textStyle: {
                    $ref: 'https://schemas.micromag.ca/0.1/fields/text-style.json',
                    title: 'Text style',
                    setting: true,
                    intl: {
                        title: messages.textStyle,
                    },
                },
            },
        },
    ],
};
