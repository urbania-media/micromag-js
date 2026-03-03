import { v1 as uuid } from 'uuid';

import {
    badge, // video360Media,
    callToAction,
    color, // imageMedia,
    // shareIncentive,
    title, // words,
} from '../../data';

const ContributionScreen = {
    id: uuid(),
    type: 'contribution',
    layout: 'middle',
    title: { body: title() },
    name: { label: 'Votre nom' },
    message: { label: 'Votre message' },
    submit: { body: 'Envoyer' },
    background: {
        color: { alpha: 1, color: '#00FFFF' },
        // image: imageMedia({ gif: false }),
    },
    header: {
        badge: badge({
            label: {
                body: '90210',
                textStyle: { color: color() },
            },
        }), // shareIncentive: shareIncentive('☝️ consider sharing if you enjoyed it!'),
    },
    footer: { callToAction: callToAction() },
};

export default ContributionScreen;
