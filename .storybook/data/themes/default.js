import { v1 as uuid } from 'uuid';

export default {
    type: 'theme',
    title: 'Default Theme',
    colors: {
        primary: { alpha: 1, color: '#0F0' },
        secondary: { alpha: 1, color: '#00F' },
    },
    background: {
        color: { alpha: 1, color: '#fc0' },
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
            color: { alpha: 1, color: '#F0F' },
        },
        button: {
            fontSize: 16,
            fontFamily: 'Lato',
            color: { alpha: 1, color: '#F0F' },
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
