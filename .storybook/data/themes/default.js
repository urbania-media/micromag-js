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
    textStyles: {
        heading1: {
            fontSize: 36,
            fontFamily: 'Courier',
        },
        heading2: {
            fontSize: 24,
            fontFamily: 'Courier',
            fontWeight: 'bold',
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
        cta: {
            color: {
                alpha: 1,
                color: '#222222',
            },
            fontFamily: 'Agrandir Narrow',
            fontSize: 14,
            fontWeight: 700,
            fontStyle: {
                bold: false,
            },
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
    boxStyles: {
        // button: {},
        cta: {
            borderColor: {
                alpha: 0.5,
                color: '#f5ff00',
            },
            padding: { top: 5, left: 10, right: 10, bottom: 5 },
            backgroundColor: {
                color: '#fcff00',
                alpha: 1,
            },
            borderWidth: 4,
            borderRadius: 40,
            dropShadow: {
                distance: 5,
                blur: 0,
            }
        },
    },
};
