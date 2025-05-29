import { defaultTheme } from '../themes/micromag-default';

const Quiz = {
    id: 'asdfasdfsadf2343',
    title: 'Surveys',
    theme: defaultTheme,
    components: [
        {
            id: '2e0f52d0-a3f3-11ed-b465-6492836429',
            type: 'survey',
            question: {
                body: '<span><strong>Quel est ton nom?</strong></span>',
            },
            parameters: {
                metadata: {
                    title: 'Sondage',
                    description: 'Matchmaker',
                },
            },
            customAnswer: {
                active: true,
                placeholder: {
                    body: 'Ton Nom',
                    textStyle: {
                        color: {
                            alpha: 1,
                            color: '#ff00ff',
                        },
                        textAlign: 'center',
                    },
                },
                submit: {
                    body: 'Submit!',
                    textStyle: {
                        color: {
                            alpha: 1,
                            color: '#00ff00',
                        },
                        textAlign: 'right',
                    },
                },
                textStyle: {
                    fontSize: 12,
                    color: {
                        alpha: 1,
                        color: '#fff',
                    },
                },
            },

            group: null,
            parentId: null,
            result: null,
            answers: [],
            background: {
                color: {
                    color: '#223322',
                },
                video: 'media://3799',
                image: null,
            },
        },
        {
            id: '2e0f52d0-a3f3-11ed-b465-489593279',
            type: 'survey',
            question: {
                body: '<span><strong>Quel est ton nom de famille?</strong></span>',
            },
            parameters: {
                metadata: {
                    title: 'Sondage',
                    description: 'Matchmaker',
                },
            },
            customAnswer: {
                active: true,
                placeholder: {
                    body: 'Placeholder',
                    textStyle: {
                        color: {
                            alpha: 1,
                            color: '#ff00ff',
                        },
                        textAlign: 'center',
                    },
                },
                textStyle: {
                    fontSize: 12,
                    color: {
                        alpha: 1,
                        color: '#fff',
                    },
                },
            },
            buttonsStyle: {
                background: {
                    color: '#000',
                },
            },
            buttonsTextStyle: {
                fontSize: 11,
                color: {
                    alpha: 0.2,
                    color: '#0f0',
                },
            },
            group: null,
            parentId: null,
            result: {
                body: 'HAHAHA loser',
                textStyle: {
                    color: {
                        alpha: 1,
                        color: '#00ff00',
                    },
                },
            },
            answers: [
                {
                    label: {
                        body: 'Tremblay',
                        textStyle: {
                            fontSize: 14,
                            color: {
                                alpha: 1,
                                color: '#ff0000',
                            },
                        },
                    },
                },
                {
                    label: {
                        body: 'Lavoie',
                    },
                },
                {
                    label: {
                        body: 'Cracker',
                        textStyle: {
                            fontSize: 19,
                            color: {
                                alpha: 1,
                                color: '#ff0000',
                            },
                        },
                    },
                },
            ],
            background: {
                color: {
                    color: '#223322',
                },
                video: 'media://3799',
                image: null,
            },
        },
        {
            id: '440f52d0-sdfa-11ed-b465-sdfkasgd',
            type: 'survey',
            question: {
                body: 'What is your level of tiredness',
            },
            withoutBar: false,
            withoutPercentage: false,
            withCount: true,
            parameters: {
                metadata: {
                    title: 'Sondage',
                    description: 'Tiredness',
                },
            },
            buttonsTextStyle: {
                fontSize: 14,
                color: {
                    alpha: 1,
                    color: '#ff00ff',
                },
            },
            group: null,
            parentId: null,
            answers: [
                {
                    label: {
                        body: "I'm tired",
                    },
                    result: {
                        body: 'Not really',
                        textStyle: {
                            color: {
                                alpha: 1,
                                color: '#00ff00',
                            },
                        },
                    },
                },
                {
                    label: {
                        body: "I'm very tired",
                    },
                },
                {
                    label: {
                        body: "I'm very very tired",
                    },
                },
                {
                    label: {
                        body: "I'm gonna go now",
                    },
                },
            ],
            background: {
                color: null,
                video: 'media://3799',
                image: null,
            },
        },
        {
            id: '2e0f52d0-a3f3-11ed-b465-fdb28f5b492b',
            type: 'survey',
            question: {
                body: '<span><strong>...</strong></span>',
            },
            withoutBar: false,
            withoutPercentage: false,
            parameters: {
                metadata: {
                    title: 'Sondage',
                    description: 'Matchmaker',
                },
            },
            buttonsTextStyle: {
                fontSize: 16,
                color: {
                    alpha: 1,
                    color: '#000000',
                },
            },
            group: null,
            parentId: null,
            result: {
                body: 'HAHAHA',
                textStyle: {
                    color: {
                        alpha: 1,
                        color: '#00ff00',
                    },
                },
            },
            answers: [
                {
                    label: {
                        body: 'Oui! Les apps m’ont trop déçu.e',
                    },
                },
                {
                    label: {
                        body: 'Oui… quand mon pouce se tannera de swiper à gauche',
                    },
                },
                {
                    label: {
                        body: 'J’aime mieux aborder les gens dans le monde réel',
                    },
                },
                {
                    label: {
                        body: 'Tinder et moi sommes déjà en relation exclusive',
                    },
                },
            ],
            background: {
                color: null,
                video: 'media://3799',
                image: null,
            },
        },
    ],
};

export default Quiz;
