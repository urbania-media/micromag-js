import team from '../team';
import { defaultTheme } from '../themes/micromag-default';

const multipleKeypads = {
    title: 'Multiple Keypads',
    theme: defaultTheme,
    components: [
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
            },
            buttonStyles: {
                buttonLayout: 'label-top',
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
        {
            background: {
                color: { alpha: 1, color: '#ff008f', },
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
            },
            buttonStyles: {
                buttonLayout: 'no-label',
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
                boxStyle: {
                    borderStyle: 'solid',
                    backgroundColor: {
                        color: '#f3a9d3',
                        alpha: 0.65,
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
