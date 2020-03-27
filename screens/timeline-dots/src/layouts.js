export default [
    {
        name: 'withIntro',
        props: {
            title: {
                text: {
                    body: `<p>Nous vivons en ce moment une épidémie qui a des conséquences graves sur l’économie. Plusieurs d’entre vous ont peut-être perdu une partie importante</p>`,
                },
            },
            items: [
                { text: { body: `<p>Nous vivons en ce moment une épidémie qui a des conséquences graves sur l’économie. Plusieurs d’entre vous ont peut-être perdu une partie importante</p>` } },
                { text: { body: `<p>Nous vivons en ce moment une épidémie qui a des conséquences graves sur l’économie. Depuis le 25 mars, le gouvernement Trudeau a décrété la Loi sur la mise en quarantaine, nouvelle loi qui oblige tous</p>` } },
                { text: { body: `<p>Nous vivons en ce moment une épidémie qui a des conséquences graves sur l’économie. </p>` } },
            ],
        },
    },
    {
        name: 'withImage',
        props: {
            items: [
                {
                    image: {
                        url: 'https://picsum.photos/400/600',
                    },
                    text: { body: `<p>Nous vivons en ce moment une épidémie</p>` },
                },
                {
                    image: {
                        url: 'https://picsum.photos/400/600',
                    },
                    text: { body: `<p>Nous vivons en ce moment une épidémie</p>` },
                },
                {
                    image: {
                        url: 'https://picsum.photos/400/600',
                    },
                    text: { body: `<p>Nous vivons en ce moment une épidémie</p>` },
                },
            ],
        },
    },
    {
        name: 'withHeader',
        props: {},
    },
];
