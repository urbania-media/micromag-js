import { schemas as messages } from './messages';

export default {
    $id: 'https://schemas.micromag.ca/0.1/elements/image.json',
    title: 'Image',
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
                media: {
                    title: 'Image',
                    $ref: 'https://schemas.micromag.ca/0.1/fields/image.json',
                    intl: {
                        title: messages.textStyle,
                    },
                    componentProps: {
                        withoutLabel: true,
                    },
                },
                caption: {
                    $ref: 'https://schemas.micromag.ca/0.1/fields/text-editor.json',
                    title: 'Caption',
                    setting: true,
                    intl: {
                        title: messages.caption,
                    },
                },
                containerStyle: {
                    $ref: 'https://schemas.micromag.ca/0.1/fields/container-style.json',
                    title: 'Container style',
                    setting: true,
                    advanced: true,
                    intl: {
                        title: messages.container,
                    },
                },
                imageStyle: {
                    $ref: 'https://schemas.micromag.ca/0.1/fields/image-style.json',
                    title: 'Image style',
                    setting: true,
                    advanced: true,
                    intl: {
                        title: messages.imageStyle,
                    },
                },
            },
        },
    ],
};
