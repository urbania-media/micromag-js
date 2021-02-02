import { v1 as uuid } from 'uuid';

const text = {
    color: { color: '#FFF', alpha: 1 },
    align: 'left',
    fontStyle: { bold: false, italic: false, underline: false },
    lineHeight: 1.3,
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
            fontFamily: 'Helvetica',
            fontSize: 32,
            ...text,
        },
        heading2: {
            fontFamily: 'Helvetica',
            fontSize: 24,
            ...text,
        },
        heading3: {
            fontFamily: 'Helvetica',
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
            text: {
                body: 'Test body',
            },
        },
    ],
};

export default defaultTheme;
