import { v1 as uuid } from 'uuid';

import { signs } from '../../../screens/urbania-horoscope';
import { callToAction, badge } from '../../data';

export default {
    id: uuid(),
    type: 'keypad',
    items: signs.map(({ id = '' }) => ({
        label: id,
    })),
    keypadLayout: {
        columnAlign: 'middle',
        columns: 3,
        spacing: 10,
    },
    // background: backgroundVideo(),
    header: { badge: badge() },
    footer: { callToAction: callToAction() },
    buttonStyles: {
        textStyle: {
            color: { color: '#F00', alpha: 0.8 },
        },
    },
};
