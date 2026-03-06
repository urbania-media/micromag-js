import { v1 as uuid } from 'uuid';

import { signs } from '../../../screens/urbania-horoscope';
import { callToAction, imageMedia, paragraph, videoMedia } from '../../data';

export default {
    id: uuid(),
    type: 'keypad',
    title: {
        body: 'Horoscope 2.0',
    },
    items: signs.map(({ id = 'sign' }) => ({
        label: id,
        textStyle: {
            color: { color: '#00F', alpha: 1 },
        },
        value: id,
        heading: {
            body: id,
        },
        content: {
            body: paragraph(),
        },
        visual: Math.random() > 0.5 ? imageMedia({ rand: true, width: 500, height: 500 }) : null,
        largeVisual:
            Math.random() > 0.5
                ? imageMedia({ rand: true, width: 500, height: 500 })
                : videoMedia({ rand: true, width: 500, height: 500 }),
        boxStyle: {
            backgroundColor: { color: '#00ff77', alpha: 1 },
            borderRadius: 4,
        },
        // popupBoxStyle: {
        //     backgroundColor: { color: '#ff00ff', alpha: 1 },
        //     borderRadius: 10,
        // },
    })),
    keypadLayout: {
        columnAlign: 'middle',
        columns: 3,
        spacing: 10,
    },
    background: {
        color: { color: '#f0f0f0', alpha: 1 },
    },
    header: null,
    footer: { callToAction: callToAction() },
    buttonStyles: {
        textStyle: {
            color: { color: '#F00', alpha: 0.8 },
        },
    },
    popupStyles: {
        boxStyle: {
            backgroundColor: { color: '#f2702d', alpha: 1 },
            borderRadius: 30,
        },
    },
};
