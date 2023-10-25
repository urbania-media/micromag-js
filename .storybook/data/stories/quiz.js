// import { imageMediaFromURL, videoMediaFromURL } from '../../data';
// import bgVideo from '../files/signs/horoscope.mp4';
// import signs from '../signs';
import { defaultTheme } from '../themes/micromag-default';

// import background from '../files/signs/horoscope-background.png';

const Quiz = {
    id: '93846509123645',
    title: 'Multiple Quizzzes',
    theme: defaultTheme,
    components: [
        {
            background: {
                color: {
                    color: '#002200',
                    alpha: 1,
                },
                image: null,
                video: null,
            },
            id: '9283645093465',
            type: 'quiz-multiple',
            group: null,
            layout: 'bottom',
            buttonsTextStyle: {
                fontFamily: 'Courier New',
            },
            title: {
                body: '<span>TITRE</span>',
                textStyle: {
                    fontFamily: 'Agrandir',
                    fontSize: 24,
                    fontStyle: {
                        bold: true,
                        italic: true,
                        underline: true,
                        transform: 'uppercase',
                    },
                    color: {
                        color: '#F00',
                        alpha: 1,
                    },
                    lineHeight: 1.3,
                    letterSpacing: 1,
                },
            },
            description: {
                body: '<p>DESCRIPTION</p>',
                textStyle: {
                    fontFamily: 'Georgia',
                    fontSize: 16,
                    color: {
                        color: '#F00',
                        alpha: 1,
                    },
                    fontStyle: {
                        bold: true,
                        italic: true,
                        underline: true,
                        transform: 'uppercase',
                    },
                    lineHeight: 1.3,
                    letterSpacing: 1,
                },
            },
            introButton: {
                body: '<span>BOUTON</span>',
                textStyle: {
                    fontFamily: 'Times New Roman',
                    fontSize: 20,
                    fontStyle: {
                        bold: true,
                        italic: true,
                        underline: true,
                        transform: 'uppercase',
                    },
                    color: {
                        color: '#F00',
                        alpha: 1,
                    },
                    lineHeight: 1.3,
                    letterSpacing: 1,
                },
            },
            questions: [
                {
                    text: {
                        body: '<span>Une question</span>',
                    },
                    answers: [
                        {
                            label: {
                                body: 'Une réponse',
                            },
                            points: 2,
                        },
                    ],
                },
            ],
            results: [
                {
                    layout: 'split',
                    title: {
                        body: '<span>TITRE RÉSULTAT</span>',
                    },
                    description: {
                        body: '<p>DESCRIPTION RÉSULTAT</p>',
                    },
                    points: 1,
                    background: {
                        color: {
                            color: '#45babb',
                            alpha: 1,
                        },
                    },
                },
            ],
        },
        // {
        //     id: 'quiz-micromag-34569824',
        //     type: 'quiz',
        //     group: null,
        //     withoutTrueFalse: false,

        //     result: {
        //         body: '<p><strong>1-866-APPELLE en cas de doute.</strong></p>',
        //     },
        //     parentId: null,
        //     buttonsTextStyle: {
        //         fontWeight: 700,
        //         fontSize: 18,
        //     },
        //     answers: [
        //         {
        //             good: true,
        //             label: {
        //                 body: 'Papa ou maman',
        //                 // textStyle: {
        //                 //     align: 'center',
        //                 //     lineHeight: 1,
        //                 //     fontStyle: {
        //                 //         underline: false,
        //                 //         italic: false,
        //                 //         bold: true,
        //                 //     },
        //                 //     fontSize: 26,
        //                 //     color: {
        //                 //         alpha: 1,
        //                 //         color: '#222222',
        //                 //     },
        //                 //     fontFamily: {
        //                 //         type: 'custom',
        //                 //         name: 'Agrandir Tight',
        //                 //         media: 'media://2452',
        //                 //     },
        //                 // },
        //             },
        //         },
        //         {
        //             label: {
        //                 body: 'Votre frère/soeur',
        //             },
        //         },
        //         {
        //             label: {
        //                 body: 'Un.e ami.e de confiance',
        //             },
        //         },
        //         {
        //             good: true,
        //             label: {
        //                 body: 'Votre thérapeute',
        //             },
        //         },
        //         {
        //             label: {
        //                 body: 'Une ligne d’aide',
        //             },
        //         },
        //         {
        //             label: {
        //                 body: 'Personne',
        //             },
        //         },
        //     ],
        //     goodAnswerColor: {
        //         alpha: 1,
        //         color: '#00ff2d',
        //     },
        //     parameters: {
        //         metadata: {
        //             description: 'La Soukkot',
        //             title: 'Sondage',
        //         },
        //     },
        //     question: {
        //         body: '<span><strong>Quand ça ne va pas et que vous avez besoin de parler, vers qui vous tournez-vous?</strong></span>',
        //     },
        //     // background: {
        //     //     image: null,
        //     //     video: null,
        //     //     color: null,
        //     // },
        //     layout: 'middle',
        //     badAnswerColor: {
        //         alpha: 1,
        //         color: '#ff00ff',
        //     },
        //     buttonsStyle: {
        //         borderWidth: 2,
        //         shadowColor: {
        //             alpha: 1,
        //             color: '#ffffff',
        //         },
        //         shadowDistance: 3,
        //         backgroundColor: {
        //             alpha: 0.44,
        //             color: '#ffffff',
        //         },
        //         borderColor: {
        //             alpha: 1,
        //             color: '#000000',
        //         },
        //         shadowBlur: 2,
        //         borderRadius: 10,
        //         shadowAngle: -90,
        //         borderStyle: 'solid',
        //     },
        // },
        // {
        //     id: '2e0f52d0-a3f3-11ed-b465-fdb28f5b492b',
        //     type: 'survey',
        //     question: {
        //         body: '<span><strong>xxx</strong></span>',
        //     },
        //     withoutBar: false,
        //     withoutPercentage: false,
        //     parameters: {
        //         metadata: {
        //             title: 'Sondage',
        //             description: 'Matchmaker',
        //         },
        //     },
        //     buttonsTextStyle: {
        //         fontSize: 16,
        //         color: {
        //             alpha: 1,
        //             color: '#000000',
        //         },
        //     },
        //     group: null,
        //     parentId: null,
        //     answers: [
        //         {
        //             label: {
        //                 body: 'Oui! Les apps m’ont trop déçu.e',
        //             },
        //         },
        //         {
        //             label: {
        //                 body: 'Oui… quand mon pouce se tannera de swiper à gauche',
        //             },
        //         },
        //         {
        //             label: {
        //                 body: 'J’aime mieux aborder les gens dans le monde réel',
        //             },
        //         },
        //         {
        //             label: {
        //                 body: 'Tinder et moi sommes déjà en relation exclusive',
        //             },
        //         },
        //     ],
        //     // background: {
        //     //     color: null,
        //     //     video: 'media://3799',
        //     //     image: null,
        //     // },
        //     layout: 'middle',
        //     // buttonsStyle: {
        //     //     borderRadius: 10,
        //     //     borderColor: {
        //     //         alpha: 1,
        //     //         color: '#000000',
        //     //     },
        //     //     shadowBlur: 3,
        //     //     borderStyle: 'solid',
        //     //     shadowAngle: 45,
        //     //     borderWidth: 2,
        //     //     backgroundColor: {
        //     //         alpha: 0.37,
        //     //         color: '#ffffff',
        //     //     },
        //     //     shadowDistance: 3,
        //     //     shadowColor: {
        //     //         alpha: 1,
        //     //         color: '#ffffff',
        //     //     },
        //     // },
        // },
    ],
};

export default Quiz;
