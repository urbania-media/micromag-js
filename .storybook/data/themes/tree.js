export const defaultTheme = {
    type: 'story',
    title: 'Tree story',
    components: [
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
            id: '1111111111',
            type: 'text',
            layout: 'middle',
            text: {
                body: 'Test body 1',
                style: {
                    color: {
                        color: '#000',
                        alpha: 1,
                    },
                },
            },
            group: {
                mergeNavItems: true,
                collapsed: false,
            },
            background: { color: { color: '#0FF', alpha: 1 }, image: null, video: null },
        },
        {
            id: '2222222222',
            type: 'timeline',
            bulletShape: 'square',
            background: { color: { color: '#0F0', alpha: 1 }, image: null, video: null },
            parentId: '1111111111',
        },
        {
            id: '44444444',
            type: 'text',
            layout: 'top',
            text: {
                body: 'Test body 4',
                style: {
                    color: {
                        color: '#000',
                        alpha: 1,
                    },
                },
            },
            group: {
                mergeNavItems: true,
                collapsed: true,
            },
            background: { color: { color: '#FC0', alpha: 1 }, image: null, video: null },
        },
        {
            id: '555555',
            type: 'text',
            layout: 'top',
            text: {
                body: 'Test body 5',
            },
            background: { color: { color: '#00F', alpha: 1 }, image: null, video: null },
            parentId: '44444444',
        },
        {
            id: '666666',
            type: 'text',
            layout: 'top',
            text: {
                body: 'Test body 6',
            },
            background: { color: { color: '#F0F', alpha: 1 }, image: null, video: null },
            parentId: '44444444',
        },
    ],
};

export default defaultTheme;
