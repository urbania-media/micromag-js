export default [
    {
        name: 'ThreeSplit',
        props: {
            groups: [['title'], ['subtitle'], ['description']],
            grid: {
                layout: [
                    {
                        rows: 1,
                        columns: [1],
                    },
                    {
                        rows: 1,
                        columns: [1],
                    },
                    {
                        rows: 1,
                        columns: [1],
                    },
                ],
            },
        },
    },
    {
        name: 'OneOneSplit',
        props: {
            groups: [['title', 'subtitle'], ['description']],
            grid: {
                layout: [
                    {
                        rows: 1,
                        columns: [1],
                    },
                    {
                        rows: 1,
                        columns: [1],
                    },
                ],
            },
        },
    },
    {
        name: 'OneOneSplitReverse',
        props: {
            groups: [['title', 'subtitle'], ['description']],
            reverse: true,
            grid: {
                layout: [
                    {
                        rows: 1,
                        columns: [1],
                    },
                    {
                        rows: 1,
                        columns: [1],
                    },
                ],
            },
        },
    },
    {
        name: 'TwoOneSplit',
        props: {
            groups: [['title', 'subtitle'], ['description']],
            grid: {
                layout: [
                    {
                        rows: 2,
                        columns: [1],
                    },
                    {
                        rows: 1,
                        columns: [1],
                    },
                ],
            },
        },
    },
    {
        name: 'ThreeOneSplit',
        props: {
            groups: [['title', 'subtitle'], ['description']],
            grid: {
                layout: [
                    {
                        rows: 3,
                        columns: [1],
                    },
                    {
                        rows: 1,
                        columns: [1],
                    },
                ],
            },
        },
    },
];
