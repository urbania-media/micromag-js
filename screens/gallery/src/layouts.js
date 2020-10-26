export default {
    // 2
    'two-vertical': {
        vertical: true,
        layout: [
            {
                columns: 1,
                rows: [2, 1],
            },
        ],
    },
    'two-horizontal': {
        layout: [
            {
                rows: 1,
                columns: [1, 1],
            },
        ],
    },
    // 3
    'one-plus-two': {
        layout: [
            {
                rows: 1,
                columns: [1],
            },
            {
                rows: 1,
                columns: [1, 1],
            },
        ],
    },
    'two-plus-one': {
        layout: [
            {
                rows: 1,
                columns: [1, 1],
            },
            {
                rows: 1,
                columns: [1],
            },
        ],
    },
    'three-vertical': {
        vertical: true,
        layout: [
            {
                columns: 1,
                rows: [1, 1, 1],
            },
        ],
    },
    // 4
    'four-mosaic': {
        vertical: true,
        layout: [
            {
                columns: 1,
                rows: [3, 1],
            },
            {
                columns: 1,
                rows: [1, 3],
            },
        ]
    },
    'four-mosaic-reverse': {
        vertical: true,
        layout: [
            {
                columns: 1,
                rows: [1, 3],
            },
            {
                columns: 1,
                rows: [3, 1],                
            },
        ]
    },
    'two-by-two': {
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
    'one-plus-three': {
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
    },
    // 5 
    'two-wide-plus-three': {
        layout: [
            {
                rows: 2,
                columns: [1]
            },
            {
                rows: 2,
                columns: [1]
            },
            {
                rows: 1,
                columns: [1, 1, 1]
            },
        ]
    },
    'three-plus-two-wide': {
        layout: [
            {
                rows: 1,
                columns: [1, 1, 1]
            },
            {
                rows: 2,
                columns: [1]
            },
            {
                rows: 2,
                columns: [1]
            },    
        ]
    },
    // 6
    'two-by-three': {
        layout: [
            {
                rows: 1,
                columns: [1, 1],
            },
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
    'three-by-two': {
        layout: [
            {
                rows: 1,
                columns: [1, 1, 1],
            },
            {
                rows: 1,
                columns: [1, 1, 1],
            },
        ],
    }
};
