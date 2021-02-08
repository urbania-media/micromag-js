import { v1 as uuid } from 'uuid';

const text = {
    color: { color: '#F00', alpha: 0.8 },
    align: 'center',
    fontStyle: { bold: true, italic: true, underline: true, transform: 'uppercase' },
    lineHeight: 1.3,
    letterSpacing: 1,
};

export const defaultTheme = {
    type: 'theme',
    title: 'Default theme',
    colors: {
        primary: { color: '#FFF', alpha: 1 },
        secondary: { color: '#999', alpha: 1 },
    },
    background: { color: { color: '#0F0', alpha: 1 }, image: null, video: null },
    textStyle: {
        heading1: {
            fontFamily: 'Arial',
            fontSize: 32,
            ...text,
        },
        heading2: {
            fontFamily: 'Arial',
            fontSize: 24,
            ...text,
        },
        heading3: {
            fontFamily: 'Arial',
            fontSize: 20,
            ...text,
        },
        button: {
            fontFamily: 'Times New Roman',
            fontSize: 16,
            fontStyle: { bold: true, italic: false, underline: false },
            ...text,
        },
        text: {
            fontFamily: 'Georgia',
            fontSize: 16,
            ...text,
        },
    },
    components: [
        {
            id: uuid(),
            type: 'text',
            layout: 'middle',
            text: {
                body: 'Test body',
            },
        },
        {
            id: uuid(),
            type: 'timeline',
            bulletShape: 'square',
        },
    ],
};

export default defaultTheme;
