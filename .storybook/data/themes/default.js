import { v1 as uuid } from 'uuid';

export default {
    type: 'theme',
    title: 'Default Theme',
    colors: {
        primary: '#C00',
    },
    background: {
        color: '#fc0',
    },
    textStyle: {
        heading1: {
            fontSize: 36,
        },
        heading2: {
            fontSize: 24,
        },
        heading3: {
            fontSize: 18,
        },
        text: {
            fontSize: 16,
        }
    },
    components: [
        {
            id: uuid(),
            type: 'text',
            text: {
                body: 'Test body'
            }
        }
    ]
};
