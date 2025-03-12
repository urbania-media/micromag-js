import { v1 as uuid } from 'uuid';

import { signs } from '../../../screens/urbania-horoscope';
import { badge, callToAction, imageMedia, paragraph } from '../../data';

export default {
    id: uuid(),
    type: 'keypad',
    title: {
        body: 'Horoscope 2.0',
    },
    items: signs.map(({ id = 'sign' }) => ({
        label: id,
        value: id,
        heading: {
            body: id,
        },
        content: {
            body: paragraph(),
        },
        visual: imageMedia({ rand: true, width: Math.floor(Math.random() * 300) }),
    })),
    keypadLayout: {
        columnAlign: 'middle',
        columns: 3,
        spacing: 10,
    },
    background: {
        color: { color: '#f0f0f0', alpha: 1 },
    },
    header: { badge: badge() },
    footer: { callToAction: callToAction() },
    buttonStyles: {
        textStyle: {
            color: { color: '#F00', alpha: 0.8 },
        },
    },
};
