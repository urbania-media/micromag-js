import { v1 as uuid } from 'uuid';

import { badge, callToAction, medias, mediasWithCaptions, shareIncentive } from '../data';

export const galleries = [
    {
        id: uuid(),
        type: 'gallery',
        layout: 'one-two-one',
        images: medias({ count: 4 }),
        background: {
            color: { alpha: 1, color: '#FFFF00' },
        },
        header: { badge: badge() },
        footer: { callToAction: callToAction() },
    },
    {
        id: uuid(),
        type: 'gallery-feed',
        layout: 'normal',
        images: medias({ count: 5 }),
        background: {
            color: { alpha: 1, color: '#00FF00' },
        },
        header: {
            badge: badge(),
            shareIncentive: shareIncentive(
                'Lorem ipsum dolor sit amet consectetur adipiscing elit. Nunquam dolor dolor, et semper dolorem.',
            ),
        },
        footer: { callToAction: callToAction() },
    },
    {
        id: uuid(),
        type: 'gallery-feed-captions',
        layout: 'normal',
        images: mediasWithCaptions({ count: 5 }),
        background: {
            color: { alpha: 1, color: '#00FFFF' },
        },
        header: { badge: badge() },
        footer: { callToAction: callToAction() },
    },
];

export default galleries;
