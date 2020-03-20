export default [
    {
        name: 'Top',
        props: {
            box: {
                direction: null,
                axisAlign: 'top',
                crossAlign: null,
                spacing: 10,
            },
        },
    },
    {
        name: 'Center',
        props: {
            box: {
                spacing: 10,
            },
        },
    },
    {
        name: 'Bottom',
        props: {
            box: {
                direction: null,
                axisAlign: 'bottom',
                crossAlign: null,
                spacing: 10,
            },
        },
    },
    {
        name: 'TopReverse',
        props: {
            box: {
                direction: null,
                axisAlign: 'top',
                crossAlign: null,
                spacing: 10,
                reverse: true,
            },
        },
    },
    {
        name: 'CenterReverse',
        props: {
            box: {
                spacing: 10,
                reverse: true,
            },
        },
    },
    {
        name: 'BottomReverse',
        props: {
            box: {
                direction: null,
                axisAlign: 'bottom',
                crossAlign: null,
                spacing: 10,
                reverse: true,
            },
        },
    },
    {
        name: '1+3',
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
        },
    },
];
