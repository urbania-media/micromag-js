export default {
    id: 'header',
    isList: true,
    theme: true,
    fields: [
        {
            name: 'badge',
            type: 'badge',
            theme: {
                boxStyle: 'badge',
                label: {
                    textStyle: 'badge',
                },
            },
        },
        {
            name: 'shareIncentive',
            type: 'share-incentive',
        },
    ],
    // settings: [],
};
