import team from '../team';
import { defaultTheme } from '../themes/micromag-default';

const multipleKeypads = {
    title: 'Multiple Keypads',
    theme: defaultTheme,
    components: [
        // with default field
        {
            id: '0110110111101001001001001111110100101',
            type: 'keypad',
            // @todo -> should use default values here if we don't actually provide values... but it doesn't work yet
            layout: 'middle',
            keypadLayout: {
                columnAlign: 'middle',
                columns: 3,
                spacing: 10,
                withSquareItems: false,
                buttonStyles: {
                    layout: 'label-bottom',
                    boxStyle: {
                        backgroundColor: {
                            alpha: 0.15,
                            color: '#000',
                        },
                    },
                },
            },
            popupStyles: {
                layout: 'content-split',
            },
        },
        // with "team" items
        {
            id: '12345',
            type: 'keypad',
            items: team,
            layout: 'middle',
            keypadLayout: {
                columnAlign: 'middle',
                columns: 2,
                spacing: 1,
                withSquareItems: false,
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
            },
            popupStyles: {
                backdrop: { alpha: 0.5, color: '#1c1c1c' },
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
            layout: 'bottom',
            keypadLayout: {
                columnAlign: 'left',
                columns: 4,
                spacing: 10,
                withSquareItems: true,
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
                textStyle: {
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
