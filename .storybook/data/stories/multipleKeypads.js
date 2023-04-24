import { imageMediaFromURL, videoMediaFromURL } from '../../data';
import bgVideo from '../files/signs/horoscope.mp4';
import signs from '../signs';
import team from '../team';
import { defaultTheme } from '../themes/micromag-default';

import background from '../files/signs/horoscope-background.png';

const multipleKeypads = {
    title: 'Multiple Keypads',
    theme: defaultTheme,
    components: [
        // with astrological signs
        {
            id: 'asstrrologgy',
            type: 'keypad',
            items: signs.map((s) => {
                const { id: label = null, image = null, description: content = null } = s || {};
                return {
                    label,
                    heading: {
                        body: label,
                    },
                    visual: imageMediaFromURL(image),
                    largeVisual: imageMediaFromURL(image),
                    content,
                };
            }),
            layout: 'middle',
            keypadSettings: {
                layout: {
                    columnAlign: 'middle',
                    columns: 3,
                    spacing: 5,
                    withSquareItems: true,
                },
            },
            buttonStyles: {
                layout: 'label-bottom',
                textStyle: {
                    fontWeight: 'bold',
                    fontSize: 12,
                    transform: 'uppercase',
                },
                boxStyle: {
                    backgroundColor: {
                        color: '#1518ee',
                        alpha: 1,
                    },
                    borderRadius: 10,
                    padding: {
                        top: 5,
                        right: 5,
                        left: 5,
                        bottom: 5,
                    },
                },
            },
            popupStyles: {
                backdrop: {
                    color: {
                        alpha: 0.5,
                        color: '#1518ee',
                    },
                    image: videoMediaFromURL(bgVideo),
                },
                headingTextStyle: {
                    align: 'center',
                    fontSize: 24,
                    fontStyle: {
                        transform: 'uppercase',
                    },
                    color: {
                        alpha: 1,
                        color: '#1d3af2',
                    },
                },
                contentTextStyle: {
                    align: 'center',
                    color: {
                        alpha: 1,
                        color: '#1d3af2',
                    },
                },
                boxStyle: {
                    backgroundColor: {
                        color: '#0ff',
                        alpha: 1,
                    },
                    borderRadius: 22,
                    shadowAngle: 45,
                    shadowDistance: 0,
                    shadowBlur: 4,
                    shadowColor: { alpha: 1, color: '#010f66' },
                },
            },
            background: {
                color: {
                    color: '#1d3af2',
                },
                image: imageMediaFromURL(background),
            },
        },

        // with "team" items
        {
            id: '12345',
            type: 'keypad',
            items: team,
            layout: 'middle',
            keypadSettings: {
                layout: {
                    columnAlign: 'middle',
                    columns: 2,
                    spacing: 1,
                    withSquareItems: false,
                },
            },
            buttonStyles: {
                layout: 'label-top',
                textStyle: {
                    fontStyle: {
                        bold: true,
                        italic: false,
                        underline: false,
                    },
                    fontSize: 8,
                },
                boxStyle: {
                    backgroundColor: {
                        color: '#23195c',
                        alpha: 1,
                    },
                    borderRadius: 10,
                    padding: {
                        bottom: 5,
                    },
                },
            },
            popupStyles: {
                // backdrop: { alpha: 0.5, color: '#1c1c1c' },
            },
        },
        {
            background: {
                color: { alpha: 1, color: '#ff008f' },
                image: null,
                video: null,
            },
            id: '54321',
            type: 'keypad',
            items: team,
            title: { body: 'Team' },
            layout: 'bottom',
            keypadSettings: {
                layout: {
                    columnAlign: 'left',
                    columns: 4,
                    spacing: 10,
                    withSquareItems: true,
                },
            },
            buttonStyles: {
                layout: 'no-label',
                boxStyle: {
                    borderRadius: 10,
                    shadowAngle: 45,
                    shadowDistance: 5,
                    shadowColor: { alpha: 0.15, color: '#000000' },
                    borderStyle: 'solid',
                    borderWidth: 1,
                    borderColor: { alpha: 0.5, color: '#ffffff' },
                },
                textStyle: null,
            },
            popupStyles: {
                layout: 'content-top',
                backdrop: { alpha: 0.75, color: '#f3a9d3' },
                boxStyle: {
                    borderStyle: 'solid',
                    backgroundColor: {
                        color: '#f3a9d3',
                        alpha: 0.9,
                    },
                    borderRadius: 20,
                    shadowAngle: 45,
                    shadowDistance: 10,
                    padding: {
                        left: 10,
                        top: 10,
                        right: 10,
                        bottom: 10,
                    },
                    borderWidth: 2,
                    shadowColor: {
                        color: '#010101',
                        alpha: 0.33,
                    },
                },
                headingTextStyle: {
                    color: {
                        color: '#000000',
                        alpha: 1,
                    },
                },
                contentTextStyle: {
                    color: {
                        color: '#000000',
                        alpha: 1,
                    },
                },
            },
        },
    ],
};

export default multipleKeypads;
