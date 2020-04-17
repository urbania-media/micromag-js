import { names } from './layouts/names';

export default {
    $id: 'https://schemas.micromag.ca/0.1/screens/title.json',
    group: 'Title',
    title: 'Title',
    type: 'object',
    allOf: [
        {
            $ref: 'https://schemas.micromag.ca/0.1/screens/screen.json',
        },
        {
            properties: {
                layout: {
                    type: 'string',
                    title: 'Mise en page',
                    enum: names,
                    default: 'default',
                    component: 'layout'
                },
                title: {
                    title: 'Titre',
                    $ref: 'https://schemas.micromag.ca/0.1/elements/heading.json'
                },
                subtitle: {
                    title: 'Sous-titre',
                    $ref: 'https://schemas.micromag.ca/0.1/elements/heading.json'
                },
                description: {
                    title: 'Description',
                    $ref: 'https://schemas.micromag.ca/0.1/elements/text.json'
                },
                background: {
                    title: 'Arrière-Plan',
                    $ref: 'https://schemas.micromag.ca/0.1/elements/background.json'
                },
            },
        },
    ],
};
