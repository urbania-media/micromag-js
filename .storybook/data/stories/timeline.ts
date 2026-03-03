import { v1 as uuid } from 'uuid';

import audioMp3 from '../files/test.mp3';

export default {
    id: uuid(),
    type: 'timeline',
    alternatives: {
        audio: {
            autoPlay: true,
            withControls: true,
            media: {
                url: audioMp3,
            },
        },
    },
};
