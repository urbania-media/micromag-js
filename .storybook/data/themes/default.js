import { v1 as uuid } from 'uuid';

export default {
    type: 'theme',
    title: 'Default Theme',
    colors: {
        primary: { color: '#0F0', alpha: 1 },
        secondary: { color: '#00F', alpha: 1 },
    },
    background: {
        color: '#fc0',
    },
    textStyle: {
        heading1: {
            fontSize: 36,
            fontFamily: 'Courier',
        },
        heading2: {
            fontSize: 24,
            fontFamily: 'Courier',
        },
        heading3: {
            fontSize: 18,
            fontFamily: 'Courier',
        },
        text: {
            fontSize: 16,
            fontFamily: 'Arial',
            color: '#F0F',
        },
        button: {
            fontSize: 16,
            fontFamily: 'Lato',
            color: '#F0F',
        },
    },
    components: [
        {
            id: uuid(),
            type: 'text',
            text: {
                body: 'Test body',
            },
        },
    ],
};
