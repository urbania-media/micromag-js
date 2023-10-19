import {
    // bigVideoMediaWithSound,
    // videoMedia,
    imageMedia,
} from '../../data';

export default {
    title: 'Test 1-2-3-4 my title is very long and annoying',
    surtitle: 'HAHAHA',
    components: [
        {
            id: '1cb8a4be-5c1a-11eb-985f-ad6fce99ds4',
            type: 'article',
            // image: videoMedia(),
            image: {
                id: '402078',
                url: 'https://cdn.urbania.ca/media/2022/04/Prix-Crabe.jpg',
                type: 'image',
                title: null,
                description: null,
                width: 3840,
                height: 2160,
                sizes: {
                    original: {
                        url: 'https://img.urbania.ca/media/2022/04/Prix-Crabe.jpg?fm=jpg',
                        width: 3840,
                        height: 2160,
                    },
                    original_webp: {
                        url: 'https://img.urbania.ca/media/2022/04/Prix-Crabe.jpg?fm=webp&q=75',
                        width: 3840,
                        height: 2160,
                    },
                    thumbnail: {
                        url: 'https://img.urbania.ca/media/2022/04/Prix-Crabe.jpg?fm=jpg&fit=crop&crop=faces%2Cedges&w=200&h=200',
                        width: 200,
                        height: 200,
                    },
                    thumbnail_webp: {
                        url: 'https://img.urbania.ca/media/2022/04/Prix-Crabe.jpg?fm=webp&q=75&fit=crop&crop=faces%2Cedges&w=200&h=200',
                        width: 200,
                        height: 200,
                    },
                    small: {
                        url: 'https://img.urbania.ca/media/2022/04/Prix-Crabe.jpg?fm=jpg&fit=max&w=400&h=400',
                        width: 400,
                        height: 225,
                    },
                    small_webp: {
                        url: 'https://img.urbania.ca/media/2022/04/Prix-Crabe.jpg?fm=webp&q=75&fit=max&w=400&h=400',
                        width: 400,
                        height: 225,
                    },
                    medium: {
                        url: 'https://img.urbania.ca/media/2022/04/Prix-Crabe.jpg?fm=jpg&fit=max&w=700&h=700',
                        width: 700,
                        height: 394,
                    },
                    medium_webp: {
                        url: 'https://img.urbania.ca/media/2022/04/Prix-Crabe.jpg?fm=webp&q=75&fit=max&w=700&h=700',
                        width: 700,
                        height: 394,
                    },
                    large: {
                        url: 'https://img.urbania.ca/media/2022/04/Prix-Crabe.jpg?fm=jpg&fit=max&w=1400',
                        width: 3840,
                        height: 2160,
                    },
                    large_webp: {
                        url: 'https://img.urbania.ca/media/2022/04/Prix-Crabe.jpg?fm=webp&q=75&fit=max&w=1400',
                        width: 3840,
                        height: 2160,
                    },
                    cover: {
                        url: 'https://img.urbania.ca/media/2022/04/Prix-Crabe.jpg?fm=jpg&fit=max&w=1400&h=1400',
                        width: 1400,
                        height: 788,
                    },
                    cover_webp: {
                        url: 'https://img.urbania.ca/media/2022/04/Prix-Crabe.jpg?fm=webp&q=75&fit=max&w=1400&h=1400',
                        width: 1400,
                        height: 788,
                    },
                },
                credits: null,
            },
            title: {
                body: 'Shocking Secrets of Wealthy Crabs',
            },
            surtitle: {
                body: '<p>Generational Fortunes</p>',
                textStyle: {
                    color: {
                        color: '#909090',
                        alpha: 1,
                    },
                    align: 'left',
                    // fontFamily: 'Georgia',
                    // fontSize: 12,
                    fontStyle: {
                        bold: false,
                        italic: false,
                        underline: false,
                    },
                    lineHeight: 1,
                    letterSpacing: 0,
                },
            },
            date: {
                body: '1969-04-20',
                textStyle: {
                    color: {
                        color: '#909090',
                        alpha: 1,
                    },
                    fontFamily: 'Courier',
                },
            },
            author: {
                name: { body: '<p>Cash Clawson</p>' },
                image: imageMedia(),
                url: 'https://urbania.ca/auteurs/hugomeunier',
                collaborator: {
                    body: '<p>Illustrations: Fineas Finley</p>',
                },
            },
            text: {
                body: '<p><a target="_blank" rel="noopener noreferrer" href="https://www.google.com">Hello!</a> I am <mark>here</mark>.<h1>Heading 1</h1></p><p>Fugiat sit laborum labore ipsum anim deserunt ipsum. Lorem nostrud ipsum excepteur irure pariatur. Enim id nisi sunt mollit sit occaecat culpa mollit sit incididunt aliqua. Elit exercitation laborum irure officia magna cillum sit dolore duis minim. Et qui id ex exercitation Lorem veniam eu officia aliquip occaecat incididunt. Lorem aliquip reprehenderit cupidatat tempor aliquip sunt id.</p><h2>Heading 2</h2><p>Velit esse pariatur elit eu sit minim irure culpa. Labore ex ad amet labore. Ut ea cupidatat reprehenderit dolor commodo aliqua veniam id incididunt. Mollit Lorem ea officia est consequat deserunt consequat aute qui nostrud irure. Quis minim laboris adipisicing elit quis sunt ea dolore consequat.</p><h3>Heading 3</h3><ul><li>hello</li><li>hello</li><li>hello</li></ul><br><blockquote><p>To die, to sleep;To sleep: perchance to dream: ay, there\'s the rub;</p><footer>Shakespeare, <cite>Hamlet</cite></footer></blockquote><ol><li>hello</li><li>hello</li><li>hello</li></ol>',
                textStyle: {
                    fontSize: 16,
                    fontStyle: {
                        bold: true,
                    },
                    align: 'left',
                    color: '#ff4dff',
                    highlight: { color: { color: '#d11414', alpha: 1 } },
                    link: { color: { color: '#d03da2', alpha: 1 } },
                },
            },
            background: {
                color: { color: '#101010', alpha: 1 },
            },
            footer: {
                callToAction: {
                    active: true,
                    label: { body: 'Hello', textStyle: { color: '#F00' } },
                    url: 'https://www.google.com',
                    boxStyle: { backgroundColor: '#f2f' },
                },
            },
            header: {
                badge: {
                    active: true,
                    label: { body: 'Crab News', textStyle: { color: '#909090' } },
                    boxStyle: {
                        backgroundColor: '#000',
                        borderRadius: 8,
                        border: 0,
                    },
                },
            },
        },
        {
            id: '1cb8a4be-5c1a-11eb-985f-ad6fce99ds48',
            type: 'article',
            // image: videoMedia(),
            image: {
                id: '402078',
                url: 'https://cdn.urbania.ca/media/2022/04/Prix-Crabe.jpg',
                type: 'image',
                title: null,
                description: null,
                width: 3840,
                height: 2160,
                sizes: {
                    original: {
                        url: 'https://img.urbania.ca/media/2022/04/Prix-Crabe.jpg?fm=jpg',
                        width: 3840,
                        height: 2160,
                    },
                    original_webp: {
                        url: 'https://img.urbania.ca/media/2022/04/Prix-Crabe.jpg?fm=webp&q=75',
                        width: 3840,
                        height: 2160,
                    },
                    thumbnail: {
                        url: 'https://img.urbania.ca/media/2022/04/Prix-Crabe.jpg?fm=jpg&fit=crop&crop=faces%2Cedges&w=200&h=200',
                        width: 200,
                        height: 200,
                    },
                    thumbnail_webp: {
                        url: 'https://img.urbania.ca/media/2022/04/Prix-Crabe.jpg?fm=webp&q=75&fit=crop&crop=faces%2Cedges&w=200&h=200',
                        width: 200,
                        height: 200,
                    },
                    small: {
                        url: 'https://img.urbania.ca/media/2022/04/Prix-Crabe.jpg?fm=jpg&fit=max&w=400&h=400',
                        width: 400,
                        height: 225,
                    },
                    small_webp: {
                        url: 'https://img.urbania.ca/media/2022/04/Prix-Crabe.jpg?fm=webp&q=75&fit=max&w=400&h=400',
                        width: 400,
                        height: 225,
                    },
                    medium: {
                        url: 'https://img.urbania.ca/media/2022/04/Prix-Crabe.jpg?fm=jpg&fit=max&w=700&h=700',
                        width: 700,
                        height: 394,
                    },
                    medium_webp: {
                        url: 'https://img.urbania.ca/media/2022/04/Prix-Crabe.jpg?fm=webp&q=75&fit=max&w=700&h=700',
                        width: 700,
                        height: 394,
                    },
                    large: {
                        url: 'https://img.urbania.ca/media/2022/04/Prix-Crabe.jpg?fm=jpg&fit=max&w=1400',
                        width: 3840,
                        height: 2160,
                    },
                    large_webp: {
                        url: 'https://img.urbania.ca/media/2022/04/Prix-Crabe.jpg?fm=webp&q=75&fit=max&w=1400',
                        width: 3840,
                        height: 2160,
                    },
                    cover: {
                        url: 'https://img.urbania.ca/media/2022/04/Prix-Crabe.jpg?fm=jpg&fit=max&w=1400&h=1400',
                        width: 1400,
                        height: 788,
                    },
                    cover_webp: {
                        url: 'https://img.urbania.ca/media/2022/04/Prix-Crabe.jpg?fm=webp&q=75&fit=max&w=1400&h=1400',
                        width: 1400,
                        height: 788,
                    },
                },
                credits: null,
            },
            title: {
                body: 'No Top Content',
            },

            author: {
                name: { body: '<p>Cash Clawson</p>' },
                image: imageMedia(),
                url: 'https://urbania.ca/auteurs/hugomeunier',
                collaborator: {
                    body: '<p>Illustrations: Fineas Finley</p>',
                },
            },
            text: {
                body: '<p><a target="_blank" rel="noopener noreferrer" href="https://www.google.com">Hello!</a> I am <mark>here</mark>.<h1>Heading 1</h1></p><p>Fugiat sit laborum labore ipsum anim deserunt ipsum. Lorem nostrud ipsum excepteur irure pariatur. Enim id nisi sunt mollit sit occaecat culpa mollit sit incididunt aliqua. Elit exercitation laborum irure officia magna cillum sit dolore duis minim. Et qui id ex exercitation Lorem veniam eu officia aliquip occaecat incididunt. Lorem aliquip reprehenderit cupidatat tempor aliquip sunt id.</p><h2>Heading 2</h2><p>Velit esse pariatur elit eu sit minim irure culpa. Labore ex ad amet labore. Ut ea cupidatat reprehenderit dolor commodo aliqua veniam id incididunt. Mollit Lorem ea officia est consequat deserunt consequat aute qui nostrud irure. Quis minim laboris adipisicing elit quis sunt ea dolore consequat.</p><h3>Heading 3</h3><ul><li>hello</li><li>hello</li><li>hello</li></ul><br><blockquote><p>To die, to sleep;To sleep: perchance to dream: ay, there\'s the rub;</p><footer>Shakespeare, <cite>Hamlet</cite></footer></blockquote><ol><li>hello</li><li>hello</li><li>hello</li></ol>',
                textStyle: {
                    fontSize: 16,
                    fontStyle: {
                        bold: true,
                    },
                    align: 'left',
                    color: '#ff4dff',
                    highlight: { color: { color: '#d11414', alpha: 1 } },
                    link: { color: { color: '#d03da2', alpha: 1 } },
                },
            },
            background: {
                color: { color: '#101010', alpha: 1 },
            },
            footer: {
                callToAction: {
                    active: true,
                    label: { body: 'Hello', textStyle: { color: '#F00' } },
                    url: 'https://www.google.com',
                    boxStyle: { backgroundColor: '#f2f' },
                },
            },
        },
    ],
};
