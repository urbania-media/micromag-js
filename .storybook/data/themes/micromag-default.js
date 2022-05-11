const text = {
    color: { color: '#F00', alpha: 0.8 },
    align: 'center',
    fontStyle: { bold: true, italic: true, underline: true, transform: 'uppercase' },
    lineHeight: 1.3,
    letterSpacing: 1,
};

export const defaultTheme = {
    type: 'theme',
    title: 'Micromag Default theme',
    colors: {
        primary: { color: '#FFF', alpha: 1 },
        secondary: { color: '#999', alpha: 1 },
    },
    background: { color: { color: '#0F0', alpha: 1 }, image: null, video: null },
    textStyles: {
        heading1: {
            fontFamily: 'Agrandir',
            fontSize: 32,
            ...text,
        },
        heading2: {
            fontFamily: 'Agrandir',
            fontSize: 24,
            fontStyle: {
                bold: true,
                transform: 'uppercase',
            },
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
        cta: {
            color: {
                alpha: 1,
                color: '#222222',
            },
            fontFamily: 'Agrandir',
            fontSize: 14,
            fontStyle: {
                bold: true,
            },
        },
    },
    boxStyles: {
        // cta: {
        //     borderColor: {
        //         alpha: 0.5,
        //         color: '#f5ff00',
        //     },
        //     borderStyle: 'solid',
        //     padding: '5 10',
        //     backgroundColor: {
        //         color: '#fcff00',
        //         alpha: 1,
        //     },
        //     borderWidth: 5,
        //     borderRadius: 30,
        // }
        cta: {
            // padding: '5 10',
            padding: {
                top: 5,
                right: 10,
                left: 10,
                bottom: 5,
            },
            borderColor: {
                color: '#fffc00',
                alpha: 0.44,
            },
            borderStyle: 'solid',
            borderWidth: 5,
            backgroundColor: {
                color: '#fffc00',
                alpha: 1,
            },
            borderRadius: 40,
            shadowDistance: 5,
            shadowBlur: 0,
            shadowColor: {
                color: '#000000',
                alpha: 1
            }
        },
    },
    components: [
        {
            id: '1111111111',
            type: 'text',
            layout: 'middle',
            text: {
                body: 'Test body 1',
            },
            background: { color: { color: '#FF0', alpha: 1 }, image: null, video: null },
        },
        {
            id: '2222222222',
            type: 'timeline',
            bulletShape: 'square',
        },
        {
            id: '333333333',
            type: 'text',
            layout: 'bottom',
            text: {
                body: 'Test body 3',
            },
            background: { color: { color: '#F00', alpha: 1 }, image: null, video: null },
        },
        {
            id: '44444444',
            type: 'text',
            layout: 'top',
            text: {
                body: 'Test body 4',
            },
            background: { color: { color: '#0FF', alpha: 1 }, image: null, video: null },
        },
    ],
};

export default defaultTheme;
