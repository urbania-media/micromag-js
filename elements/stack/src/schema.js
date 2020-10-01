import { schemas as messages } from './messages';

export default {
    $id: 'https://schemas.micromag.ca/0.1/elements/stack.json',
    title: 'Stack',
    type: 'object',
    component: 'element-list',

    intl: {
        title: messages.schemaTitle,
    },

    allOf: [
        {
            $ref: 'https://schemas.micromag.ca/0.1/elements/element.json',
        },
        {
            properties: {
                spacing: {
                    $ref: 'https://schemas.micromag.ca/0.1/fields/spacing.json',
                    title: 'Spacing',
                    setting: true,
                    intl: {
                        title: messages.spacing,
                    },
                    componentProps: {
                        withoutLabel: true,
                    },
                },
                reverse: {
                    type: 'boolean',
                    title: 'Reverse',
                    setting: true,
                    component: 'toggle',
                    intl: {
                        title: messages.reverse,
                    },
                },
            },
        },
    ],
};
