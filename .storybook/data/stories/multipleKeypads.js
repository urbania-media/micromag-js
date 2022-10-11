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
                color: { alpha: 1, color: '#fff800' },
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
        },
    ],
};

export default multipleKeypads;
