import { v1 as uuid } from 'uuid';

export const shareScreens = [
    {
        id: uuid(),
        type: 'share',
        layout: 'middle',
        heading: {
            body: 'A few options to share this screen!',
            textStyle: { textAlign: 'right' },
        },
        buttonsStyle: {
            borderRadius: 4,
            shadowAngle: 90,
            shadowColor: {
                color: '#0000ff',
                alpha: 1,
            },
            shadowDistance: 5,
            backgroundColor: {
                color: '#022c6c',
                alpha: 1,
            },
        },
        buttonsTextStyle: {
            fontFamily: null,
            fontStyle: {
                bold: false,
                transform: 'lowercase',
                italic: false,
                underline: false,
            },
            align: 'left',
            fontSize: 20,
            letterSpacing: -1.5,
        },
        options: {
            facebook: true,
            facebookMessenger: true,
            whatsapp: true,
        },
        background: {
            color: { alpha: 1, color: '#FFCC00' },
        },
    },
    {
        background: {
            color: {
                color: '#222222',
                alpha: 1,
            },
        },
        id: uuid(),
        type: 'share',
        layout: 'middle',
        heading: {
            body: 'Copy or send by email. Can specify a custom URL to share, too.',
            textStyle: {
                fontSize: 14,
                fontFamily: 'Verdana',
                fontWeight: 'bold',
                textAlign: 'center',
                fontStyle: {
                    bold: false,
                    italic: false,
                    underline: false,
                },
                align: 'center',
                color: {
                    color: '#d0cdfc',
                    alpha: 1,
                },
                lineHeight: 1.4,
            },
        },
        buttonsStyle: {
            borderRadius: 4,
            shadowAngle: 45,
            shadowColor: {
                color: '#ff00ff',
                alpha: 1,
            },
            shadowDistance: 0,
            backgroundColor: {
                color: '#928dd0',
                alpha: 1,
            },
            shadowBlur: 10,
        },
        buttonsTextStyle: {
            fontFamily: null,
            fontStyle: {
                bold: false,
                transform: 'capitalize',
                italic: false,
                underline: false,
            },
            align: 'left',
            fontSize: 18,
            letterSpacing: 2,
            color: {
                color: '#0b195f',
                alpha: 1,
            },
        },
        options: {
            facebook: false,
            twitter: false,
            facebookMessenger: false,
            copylink: true,
            email: true,
            whatsapp: false,
        },
        shareUrl: 'https://github.com/urbania-media/micromag-js',
    },

    {
        background: {
            color: {
                color: '#fae7ba',
                alpha: 1,
            },
            image: {
                id: '17',
                type: 'image',
                name: '2015-05-17 11.44.12 HDR.jpg',
                url: 'https://urbania-submissions.s3-ca-central-1.amazonaws.com/3d/471243124d49019b837cf7b93cc50f/2015-05-17-11.44.12-HDR.jpg',
                thumbnail_url:
                    'https://urbania-submissions.s3-ca-central-1.amazonaws.com/8d/0f6056d9db4d89929e0d198f9d9f28/2015-05-17-11.44.12-HDR.jpg',
                metadata: {
                    filename: '2015-05-17 11.44.12 HDR.jpg',
                    size: 5153935,
                    mime: 'image/jpeg',
                    width: 2448,
                    height: 3264,
                },
            },
        },
        id: uuid(),
        type: 'share',
        layout: 'bottom',
        heading: {
            body: '',
            textStyle: {
                fontSize: 24,
                fontFamily: 'Courier',
                fontWeight: 'bold',
                textAlign: 'center',
            },
        },
        buttonsStyle: {
            borderRadius: 4,
            shadowAngle: null,
            shadowColor: {
                alpha: 1,
                color: '#f5ff00',
            },
            shadowDistance: 5,
            backgroundColor: {
                color: '#222222',
                alpha: 1,
            },
            padding: {
                top: 0,
                bottom: 0,
                right: 0,
                left: 0,
            },
            borderWidth: 2,
            borderStyle: 'solid',
            borderColor: {
                color: '#a9a9a9',
                alpha: 1,
            },
        },
        buttonsTextStyle: {
            fontFamily: {
                type: 'google',
                name: 'Poppins',
                variants: [
                    '100',
                    '100italic',
                    '200',
                    '200italic',
                    '300',
                    '300italic',
                    'regular',
                    'italic',
                    '500',
                    '500italic',
                    '600',
                    '600italic',
                    '700',
                    '700italic',
                    '800',
                    '800italic',
                    '900',
                    '900italic',
                ],
            },
            fontStyle: {
                bold: false,
                transform: null,
                italic: false,
                underline: false,
            },
            fontWeight: 300,
            fontSize: 12,
            letterSpacing: 0.5,
            align: 'left',
            color: {
                color: '#ffffff',
                alpha: 1,
            },
        },
        options: {
            facebook: true,
            twitter: true,
            facebookMessenger: true,
            copylink: true,
            linkedin: true,
            whatsapp: true,
            email: true,
        },
    },
];

export default shareScreens;
