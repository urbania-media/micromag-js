export const defaultTheme = {
    type: 'story',
    title: 'Tree story',
    components: [
        {
            id: '1111111111',
            type: 'text',
            layout: 'middle',
            text: {
                body: 'Test body 1',
            },
            group: {
                mergeNavItems: true,
            },
            background: { color: { color: '#FF0', alpha: 1 }, image: null, video: null },
        },
        {
            id: '2222222222',
            type: 'timeline',
            bulletShape: 'square',
            background: { color: { color: '#0F0', alpha: 1 }, image: null, video: null },
            parentId: '1111111111',
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