import { v4 as uuid } from 'uuid';

import {
    // text,
    // title,
    backgroundImage, // backgroundVideo,
    imageMedia,
    transitions, // headerFooter,
    // videoMedia,
} from '../../data';

export default {
    id: uuid(),
    // layout: 'bottom',
    // category: { body: title() },
    // date: text('short'),
    // title: { body: title() },
    // sponsor: text('short'),
    // description: text('medium'),
    category: { body: 'Pièce de théâtre' },
    date: { body: '<p>du <strong>14 FÉVRIER</strong> au <strong>5 MARS</strong></p>' },
    title: { body: 'Blackbird' },
    sponsor: { body: '<p>suggéré par <strong>banque nationalE</strong></p>' },
    location: { body: '<p>suggéré par <strong>banque national3</strong></p>' },
    description: {
        body: '<p><strong>LE PITCH</strong></p><p>Un festival hivernal de musique urbaine pour célébrer le nouvel an à Québec.</p><p><strong>Pourquoi on aime?</strong></p><p>Ambiance festive et programmation électro gratuite. Que demander de plus.</p><p>Also this is too long and scrolls lalalalalal la la la la lla llllalallalla la lal la ll all all al lall  lala laaaaaaaaaaaaaaal lal lall allall llal lla lla la.',
    },
    visual: { image: imageMedia({ width: 309, height: 223 }), visualLayout: 'label-top' },
    background: {
        ...backgroundImage({ width: 320, height: 480 }),
        text: { body: 'Fun au théâtre' },
    },
    transitions: transitions(),
};
