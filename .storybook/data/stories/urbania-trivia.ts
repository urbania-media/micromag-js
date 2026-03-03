import { v4 as uuid } from 'uuid';

import { backgroundColor, transitions, videoMedia, title } from '../../data';

const video = (props) => ({
    ...props,
    media: videoMedia({ vertical: true }),
    autoPlay: true,
    loop: false,
});

export default {
    id: uuid(),
    video: video(),
    background: backgroundColor(),
    transitions: transitions(),
    title: { body: title() },
    layout: 'middle',
    padding: 80,
};
