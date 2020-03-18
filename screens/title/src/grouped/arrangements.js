export default [
    {
        name: 'TopTitle',
        props: {
            groups: [['title', 'subtitle'], ['description']],
        },
    },
    {
        name: 'TopTitleReverse',
        props: {
            groups: [['title', 'subtitle'], ['description']],
            reverse: true,
        },
    },
    {
        name: 'TopSubtitle',
        props: {},
    },
    {
        name: 'TopSubtitleReverse',
        props: {
            groups: [['subtitle', 'title'], ['description']],
            reverse: true,
        },
    },
    {
        name: 'TopDescription',
        props: {
            groups: [['description'], ['subtitle', 'title']],
        },
    },
    {
        name: 'TopDescriptionReverse',
        props: {
            groups: [['description'], ['subtitle', 'title']],
            reverse: true,
        },
    },
    {
        name: 'TopDescriptionBottomSubtitle',
        props: {
            groups: [['description'], ['title', 'subtitle']],
        },
    },
    {
        name: 'TopDescriptionBottomSubtitleReverse',
        props: {
            groups: [['description'], ['title', 'subtitle']],
            reverse: true,
        },
    },
];
