export default [
    {
        name: 'TopTop',
        props: {
            box: {
                direction: 'column',
                axisAlign: 'top',
            },
        },
    },
    {
        name: 'CenterBox',
        props: {
            box: {
                direction: 'column',
                axisAlign: 'center',
            },
        },
    },
    {
        name: 'BottomBottom',
        props: {
            box: {
                direction: 'column',
                axisAlign: 'bottom',
            },
        },
    },
    {
        name: 'TopCenter',
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
                    {
                        rows: 1,
                        columns: [1],
                    },
                ],
            },
            box: {
                direction: 'column',
            },
            position: 1,
        },
    },
    {
        name: 'CenterCenter',
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
                    {
                        rows: 1,
                        columns: [1],
                    },
                ],
            },
            box: {
                direction: 'column',
            },
            position: 2,
        },
    },
    {
        name: 'BottomCenter',
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
                    {
                        rows: 1,
                        columns: [1],
                    },
                ],
            },
            box: {
                direction: 'column',
            },
            position: 3,
        },
    },
];
