import { v4 as uuid } from 'uuid';

import { backgroundColor } from '../../data';

export default {
    id: uuid(),
    theme: null,
    url: 'https://urbania.ca/article/nicki-minaj-vs-megan-thee-stallion-ces-beefs-qui-font-vivre-le-rap',
    background: backgroundColor(),
    // background: {
    //     video: {
    //         type: 'video',
    //         url: 'https://cdn.microm.ag/video/2024-02-02/33593-121707.mp4',
    //         metadata: {
    //             width: 1080,
    //             height: 1920,
    //         },
    //     },
    // },
    cardCallToAction: { body: 'Lire l’article' },
};
