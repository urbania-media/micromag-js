export default [
    {
        name: '1+3',
        props: {
            grid: {
                layout: [
                    {
                        rows: 2,
                        columns: [1],
                    },
                    {
                        rows: 1,
                        columns: [1, 1, 1],
                    },
                ],
                spacing: 5,
            },
        },
    },
    {
        name: '1x2',
        props: {
            grid: {
                layout: [
                    {
                        rows: 1,
                        columns: [1, 1],
                    },
                ],
            },
            spacing: 5,
        },
    },
    {
        name: '4x4',
        props: {
            grid: {
                layout: [
                    {
                        rows: 1,
                        columns: [1, 1],
                    },
                    {
                        rows: 1,
                        columns: [1, 1],
                    },
                ],
            },
            spacing: 5,
        },
    },
    {
        name: '2x1',
        props: {
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
            spacing: 5,
        },
    },
    {
        name: '9x9',
        props: {
            grid: {
                layout: [
                    {
                        rows: 1,
                        columns: [1, 1, 1],
                    },
                    {
                        rows: 1,
                        columns: [1, 1, 1],
                    },
                    {
                        rows: 1,
                        columns: [1, 1, 1],
                    },
                ],
                spacing: 5,
            },
        },
    },
];
