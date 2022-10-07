import { defaultTheme } from '../themes/micromag-default';
import team from '../team';

const multipleKeypads = {
    title: 'Multiple Keypads',
    theme: defaultTheme,
    components: [
        {
            id: '12345',
            type: 'keypad',
            items: team,
            layout: 'middle',
            columnAlign: 'middle',
            columns: 3,
            spacing: 5,
        },
        {
            id: '54321',
            type: 'keypad',
            items: team,
            layout: 'bottom',
            columnAlign: 'left',
            columns: 4,
            spacing: 0,
        },
    ],
};

export default multipleKeypads;
