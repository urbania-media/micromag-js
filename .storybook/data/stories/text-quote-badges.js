export default {
    title: 'Test 1 2 3 4',
    components: [
        {
            id: '1cb8a4be-5c1a-11eb-985f-ad6fce99d847',
            type: 'text',
            text: {
                body: '<p><a target="_blank" rel="noopener noreferrer" href="https://www.google.com">Hello!</a> I am <mark>here</mark>.</p>',
                textStyle: {
                    // fontFamily: {
                    //     name: 'Garage Gothic',
                    //     fallback: 'Arial',
                    //     type: 'sans-serif',
                    // },
                    fontSize: 32,
                    fontStyle: {
                        bold: true,
                        // transform: 'uppercase',
                    },
                    // lineHeight: 0.2,
                    align: 'center',
                    color: '#ff4dff',
                    highlight: { color: { color: '#d11414', alpha: 1 } },
                    link: { color: { color: '#d03da2', alpha: 1 } },
                },
            },
            background: {
                color: { color: '#0ff', alpha: 1 },
            },
            callToAction: {
                active: true,
                label: { body: 'Hello', textStyle: { color: '#F00' } },
                url: 'https://www.google.com',
                boxStyle: { backgroundColor: '#0F0' },
            },
            header: {
                badge: {
                    active: true,
                    label: { body: 'My badge is gray', textStyle: { color: '#F0F' } },
                    boxStyle: {
                        backgroundColor: { color: '#d91b1b', alpha: 1 },
                        borderRadius: 8,
                        padding: null,
                        borderWidth: 5,
                        borderColor: { color: '#200909', alpha: 1 },
                        borderStyle: 'dashed',
                        shadowDistance: 3,
                        shadowBlur: 2,
                        shadowColor: { color: '#8f5c5c', alpha: 1 },
                        shadowAngle: -90,
                    },
                },
            },
        },
        {
            id: '1cb8a4be-5c1a-11eb-985f-ad6fce99d846',
            type: 'quote',
            quote: {
                body: '<p><a target="_blank" rel="noopener noreferrer" href="https://www.google.com">Hello!</a> I am <mark>quote</mark>.</p>',
                textStyle: {
                    // fontFamily: {
                    //     name: 'Garage Gothic',
                    //     fallback: 'Arial',
                    //     type: 'sans-serif',
                    // },
                    fontSize: 32,
                    fontStyle: {
                        bold: true,
                        // transform: 'uppercase',
                    },
                    // lineHeight: 0.2,
                    align: 'center',
                    color: '#ff4dff',
                    highlight: { color: { color: '#034050', alpha: 1 } },
                    link: { color: { color: '#d03da2', alpha: 1 } },
                },
            },
            author: {
                body: 'Paul',
            },
            background: {
                color: { color: '#00f', alpha: 1 },
            },
        },
    ],
};
