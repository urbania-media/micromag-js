import { v4 as uuid } from 'uuid';

import { imageMedia, backgroundVideo, transitions } from '../../data';
import signs from '../signs';

export default {
    id: uuid(),
    description: { body: 'Qu’est-ce que les planètes racontent sur vous cette semaine?' },
    author: {
        name: { body: 'Robert Léponge' },
        avatar: imageMedia(),
    },
    button: {
        body: '<span>Découvrir</span>',
    },
    signs,
    background: backgroundVideo(),
    transitions: transitions(),
};
