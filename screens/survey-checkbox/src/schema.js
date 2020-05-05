import { schemas as messages } from './messages';
// import { names } from './layouts/names';

export default {
    $id: 'https://schemas.micromag.ca/0.1/screens/survey-checkbox.json',
    title: 'Survey with checkboxes',
    group: 'Survey',
    type: 'object',
    intl: {
        title: messages.schemaTitle,
    },
    allOf: [
        {
            $ref: 'https://schemas.micromag.ca/0.1/screens/screen.json',
        },
        {
            properties: {
                // layout: {
                //     $ref: 'https://schemas.micromag.ca/0.1/fields/screen-layout.json',
                //     title: 'Layout',
                //     screenType: 'survey-checkbox',
                //     enum: names,
                //     intl: {
                //         title: messages.layout,
                //     },
                // },
                button: {
                    $ref: 'https://schemas.micromag.ca/0.1/elements/button.json',
                    title: 'Button style',
                    intl: {
                        title: messages.buttonStyle,
                    },
                },
                background: {
                    $ref: 'https://schemas.micromag.ca/0.1/elements/background.json',
                    title: 'Background',
                    intl: {
                        title: messages.background,
                    },
                },
            },
        },
    ],
};
