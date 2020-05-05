import { schemas as messages } from './messages';
// import { names } from './layouts/names';

export default {
    $id: 'https://schemas.micromag.ca/0.1/screens/slideshow.json',
    title: 'Slideshow',
    group: 'Gallery',
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
                //     screenType: 'slideshow',
                //     enum: names,
                //     intl: {
                //         title: messages.layout,
                //     },
                // },
                slides: {
                    $ref: 'https://schemas.micromag.ca/0.1/fields/slides.json',
                    title: 'Slide',
                    intl: {
                        title: messages.slides,
                    },
                },
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
