// import { imageMediaFromURL, videoMediaFromURL } from '../../data';
// import bgVideo from '../files/signs/horoscope.mp4';
// import signs from '../signs';
import { defaultTheme } from '../themes/micromag-default';

// import background from '../files/signs/horoscope-background.png';

const Quiz = {
    id: '93846509123645',
    title: 'Multiple Quizzes',
    theme: defaultTheme,
    components: [
        {
            callToAction: {
                label: {
                    body: 'En savoir plus',
                    textStyle: {
                        letterSpacing: 0.10000000000000001,
                        color: {
                            alpha: 1,
                            color: '#222222',
                        },
                        fontSize: 18,
                        fontFamily: {
                            type: 'custom',
                            media: 'media://2452',
                            name: 'Agrandir Tight',
                        },
                        lineHeight: 1,
                        fontStyle: {
                            italic: false,
                            bold: true,
                            underline: false,
                        },
                    },
                },
                active: false,
                boxStyle: {
                    borderRadius: 40,
                    borderWidth: 5,
                    borderColor: {
                        alpha: 0.44,
                        color: '#fffc00',
                    },
                    padding: {
                        bottom: 5,
                        left: 10,
                        right: 10,
                        top: 5,
                    },
                    backgroundColor: {
                        alpha: 1,
                        color: '#fffc00',
                    },
                    borderStyle: 'solid',
                },
                type: 'swipe-up',
            },
            type: 'title-with-box',
            subtitle: {
                body: '<span>Grandes tendances 2023</span>',
                textStyle: {
                    fontWeight: 300,
                    lineHeight: 1.1000000000000001,
                    align: 'center',
                    fontStyle: {
                        transform: 'uppercase',
                    },
                    color: {
                        alpha: 1,
                        color: '#ffffff',
                    },
                    fontSize: 16,
                    fontFamily: {
                        media: 'media://527',
                        type: 'custom',
                        variants: [],
                        name: 'AvantGarde Medium',
                    },
                },
            },
            id: 'next-micromag-458973',
            title: {
                body: '<span>Prochain micromag</span>',
                textStyle: {
                    lineHeight: 1,
                    align: 'center',
                    fontStyle: {
                        transform: 'uppercase',
                    },
                    letterSpacing: -0.5,
                    color: {
                        color: '#fffc00',
                        alpha: 1,
                    },
                    fontSize: 44,
                    fontFamily: {
                        media: 'media://60',
                        type: 'custom',
                        name: 'GarageGothic-Bold',
                    },
                },
            },
            layout: 'bottom',
            parentId: null,
            background: {
                image: null,
                video: null,
                color: null,
            },
            shareIncentive: {
                active: false,
                label: {
                    body: 'Partagez ce micromag!',
                },
            },
            group: null,
            parameters: {
                metadata: {
                    description: 'Suicide-Action',
                    title: 'Prochain Micromag',
                },
            },
        },
        {
            group: null,
            withoutTrueFalse: false,
            id: 'quiz-micromag-34569824',
            type: 'quiz',
            result: {
                body: '<p><strong>1-866-APPELLE en cas de doute.</strong></p>',
                textStyle: {
                    align: 'center',
                    lineHeight: 1.2,
                    letterSpacing: -0.5,
                    fontSize: 16,
                    color: {
                        alpha: 1,
                        color: '#ffffff',
                    },
                    fontFamily: {
                        name: 'Roboto',
                        variants: [
                            '100',
                            '100italic',
                            '300',
                            '300italic',
                            'regular',
                            'italic',
                            '500',
                            '500italic',
                            '700',
                            '700italic',
                            '900',
                            '900italic',
                        ],
                        type: 'google',
                    },
                },
            },
            parentId: null,
            buttonsTextStyle: {
                fontWeight: 700,
                fontSize: 18,
            },
            answers: [
                {
                    good: true,
                    label: {
                        body: 'Papa ou maman',
                        textStyle: {
                            align: 'center',
                            lineHeight: 1,
                            fontStyle: {
                                underline: false,
                                italic: false,
                                bold: true,
                            },
                            fontSize: 26,
                            color: {
                                alpha: 1,
                                color: '#222222',
                            },
                            fontFamily: {
                                type: 'custom',
                                name: 'Agrandir Tight',
                                media: 'media://2452',
                            },
                        },
                    },
                },
                {
                    label: {
                        body: 'Votre frère/soeur',
                        textStyle: {
                            align: 'center',
                            lineHeight: 1,
                            fontStyle: {
                                italic: false,
                                bold: true,
                                underline: false,
                            },
                            fontSize: 26,
                            color: {
                                alpha: 1,
                                color: '#222222',
                            },
                            fontFamily: {
                                type: 'custom',
                                name: 'Agrandir Tight',
                                media: 'media://2452',
                            },
                        },
                    },
                },
                {
                    label: {
                        body: 'Un.e ami.e de confiance',
                        textStyle: {
                            align: 'center',
                            lineHeight: 1,
                            fontStyle: {
                                italic: false,
                                bold: true,
                                underline: false,
                            },
                            fontSize: 26,
                            color: {
                                alpha: 1,
                                color: '#222222',
                            },
                            fontFamily: {
                                media: 'media://2452',
                                type: 'custom',
                                name: 'Agrandir Tight',
                            },
                        },
                    },
                },
                {
                    label: {
                        body: 'Votre thérapeute',
                        textStyle: {
                            align: 'center',
                            lineHeight: 1,
                            fontStyle: {
                                bold: true,
                                italic: false,
                                underline: false,
                            },
                            fontSize: 26,
                            color: {
                                alpha: 1,
                                color: '#222222',
                            },
                            fontFamily: {
                                type: 'custom',
                                name: 'Agrandir Tight',
                                media: 'media://2452',
                            },
                        },
                    },
                },
                {
                    label: {
                        body: 'Une ligne d’aide',
                        textStyle: {
                            align: 'center',
                            lineHeight: 1,
                            fontStyle: {
                                underline: false,
                                italic: false,
                                bold: true,
                            },
                            fontSize: 26,
                            color: {
                                color: '#222222',
                                alpha: 1,
                            },
                            fontFamily: {
                                name: 'Agrandir Tight',
                                media: 'media://2452',
                                type: 'custom',
                            },
                        },
                    },
                },
                {
                    good: true,
                    label: {
                        textStyle: {
                            align: 'center',
                            lineHeight: 1,
                            fontStyle: {
                                italic: false,
                                bold: true,
                                underline: false,
                            },
                            fontSize: 26,
                            color: {
                                color: '#222222',
                                alpha: 1,
                            },
                            fontFamily: {
                                media: 'media://2452',
                                name: 'Agrandir Tight',
                                type: 'custom',
                            },
                        },
                        body: 'Personne',
                    },
                },
            ],
            goodAnswerColor: {
                alpha: 1,
                color: '#00ff2d',
            },
            parameters: {
                metadata: {
                    description: 'La Soukkot',
                    title: 'Sondage',
                },
            },
            question: {
                body: '<span><strong>Quand ça ne va pas et que vous avez besoin de parler, vers qui vous tournez-vous?</strong></span>',
                textStyle: {
                    color: {
                        color: '#ffffff',
                        alpha: 1,
                    },
                    lineHeight: 1,
                    align: 'center',
                    fontStyle: {
                        italic: false,
                        transform: 'uppercase',
                        bold: false,
                        underline: false,
                    },
                    fontSize: 18,
                    fontFamily: {
                        type: 'custom',
                        media: 'media://2452',
                        variants: [
                            {
                                weight: '700',
                                media: 'media://2519',
                                style: 'normal',
                                fvd: 'n7',
                            },
                            {
                                weight: '900',
                                media: 'media://2457',
                                style: 'normal',
                                fvd: 'n9',
                            },
                            {
                                weight: '500',
                                media: 'media://2522',
                                style: 'normal',
                                fvd: 'n5',
                            },
                        ],
                        name: 'Agrandir Tight',
                    },
                },
            },
            background: {
                image: null,
                video: null,
                color: null,
            },
            layout: 'middle',
            badAnswerColor: {
                alpha: 1,
                color: '#ff0000',
            },
            buttonsStyle: {
                borderWidth: 2,
                shadowColor: {
                    alpha: 1,
                    color: '#ffffff',
                },
                shadowDistance: 3,
                backgroundColor: {
                    alpha: 0.44,
                    color: '#ffffff',
                },
                borderColor: {
                    alpha: 1,
                    color: '#000000',
                },
                shadowBlur: 2,
                borderRadius: 10,
                shadowAngle: -90,
                borderStyle: 'solid',
            },
        },
        {
            question: {
                body: '<span><strong>xxx</strong></span>',
                textStyle: {
                    align: 'center',
                    fontStyle: {
                        transform: 'uppercase',
                    },
                    fontSize: 22,
                    color: {
                        alpha: 1,
                        color: '#ffffff',
                    },
                    fontFamily: {
                        type: 'custom',
                        variants: [
                            {
                                media: 'media://2519',
                                fvd: 'n7',
                                style: 'normal',
                                weight: '700',
                            },
                            {
                                media: 'media://2457',
                                fvd: 'n9',
                                style: 'normal',
                                weight: '900',
                            },
                            {
                                media: 'media://2522',
                                fvd: 'n5',
                                style: 'normal',
                                weight: '500',
                            },
                        ],
                        name: 'Agrandir Tight',
                        media: 'media://2452',
                    },
                    lineHeight: 1,
                },
            },
            withoutBar: false,
            withoutPercentage: false,
            parameters: {
                metadata: {
                    title: 'Sondage',
                    description: 'Matchmaker',
                },
            },
            id: '2e0f52d0-a3f3-11ed-b465-fdb28f5b492b',
            type: 'survey',
            buttonsTextStyle: {
                fontSize: 16,
                color: {
                    alpha: 1,
                    color: '#000000',
                },
            },
            group: null,
            parentId: null,
            answers: [
                {
                    label: {
                        body: 'Oui! Les apps m’ont trop déçu.e',
                        textStyle: {
                            lineHeight: 1,
                            fontFamily: {
                                type: 'custom',
                                media: 'media://2452',
                                name: 'Agrandir Tight',
                            },
                            align: 'center',
                            fontSize: 26,
                            color: {
                                alpha: 1,
                                color: '#222222',
                            },
                            fontStyle: {
                                bold: true,
                                italic: false,
                                underline: false,
                            },
                        },
                    },
                },
                {
                    label: {
                        body: 'Oui… quand mon pouce se tannera de swiper à gauche',
                        textStyle: {
                            lineHeight: 1,
                            fontFamily: {
                                type: 'custom',
                                media: 'media://2452',
                                name: 'Agrandir Tight',
                            },
                            align: 'center',
                            fontSize: 26,
                            color: {
                                alpha: 1,
                                color: '#222222',
                            },
                            fontStyle: {
                                underline: false,
                                bold: true,
                                italic: false,
                            },
                        },
                    },
                },
                {
                    label: {
                        body: 'J’aime mieux aborder les gens dans le monde réel',
                        textStyle: {
                            lineHeight: 1,
                            fontFamily: {
                                media: 'media://2452',
                                name: 'Agrandir Tight',
                                type: 'custom',
                            },
                            align: 'center',
                            fontSize: 26,
                            color: {
                                color: '#222222',
                                alpha: 1,
                            },
                            fontStyle: {
                                bold: true,
                                italic: false,
                                underline: false,
                            },
                        },
                    },
                },
                {
                    label: {
                        body: 'Tinder et moi sommes déjà en relation exclusive',
                        textStyle: {
                            lineHeight: 1,
                            fontFamily: {
                                type: 'custom',
                                name: 'Agrandir Tight',
                                media: 'media://2452',
                            },
                            align: 'center',
                            fontSize: 26,
                            color: {
                                color: '#222222',
                                alpha: 1,
                            },
                            fontStyle: {
                                bold: true,
                                underline: false,
                                italic: false,
                            },
                        },
                    },
                },
            ],
            background: {
                color: null,
                video: 'media://3799',
                image: null,
            },
            layout: 'middle',
            buttonsStyle: {
                borderRadius: 10,
                borderColor: {
                    alpha: 1,
                    color: '#000000',
                },
                shadowBlur: 3,
                borderStyle: 'solid',
                shadowAngle: 45,
                borderWidth: 2,
                backgroundColor: {
                    alpha: 0.37,
                    color: '#ffffff',
                },
                shadowDistance: 3,
                shadowColor: {
                    alpha: 1,
                    color: '#ffffff',
                },
            },
        },
    ],
};

export default Quiz;
