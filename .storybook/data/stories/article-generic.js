export default {
    title: 'Test 1-2-3-4 my title is very long and annoying',
    surtitle: 'HAHAHA',
    components: [
        {
            id: '1cb8a4be-5c1a-11eb-985f-ad6fce99ds47',
            type: 'article',
            body: {
                body: '<p><a target="_blank" rel="noopener noreferrer" href="https://www.google.com">Hello!</a> I am <mark>here</mark>.</p>',
                textStyle: {
                    fontSize: 32,
                    fontStyle: {
                        bold: true,
                    },
                    align: 'center',
                    color: '#ff4dff',
                    highlight: { color: { color: '#d11414', alpha: 1 } },
                    link: { color: { color: '#d03da2', alpha: 1 } },
                },
            },
            background: {
                color: { color: '#0ff', alpha: 1 },
            },
            footer: {
                callToAction: {
                    active: true,
                    label: { body: 'Hello', textStyle: { color: '#F00' } },
                    url: 'https://www.google.com',
                    boxStyle: { backgroundColor: '#000' },
                },
            },
            header: {
                badge: {
                    active: true,
                    label: { body: 'My badge is gray', textStyle: { color: '#F0F' } },
                    boxStyle: {
                        borderRadius: 8,
                    },
                },
            },
        },
    ],
};
