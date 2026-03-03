/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';
import {
    backgroundColor, // imageMedia,
    text, // transitions,
    videoMedia,
    headerFooter,
} from '../../../../.storybook/data';
import SlideshowScreen from '../Slideshow';
import definition from '../definition';

const props = {
    // Note: the api call in the imageMedia() function will return the same image every time
    // slides: [...Array(3).keys()].map(() => ({ media: imageMedia(), caption: text() })),
    slides: [
        {
            caption: { body: 'heyooo' },
            media: {
                type: 'image',
                url: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.x1cF5E2z-cDvdwobCd7E7AHaHa%26pid%3DApi&f=1&ipt=26aa4f08bef63304cced4483b1b73041be30c8c825265c1a09f84aa44c677861&ipo=images',
            },
        },
        {
            caption: { body: 'heyooo2' },
            media: {
                type: 'image',
                url: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.pixabay.com%2Fphoto%2F2012%2F05%2F04%2F10%2F18%2Ftwo-47085_1280.png&f=1&nofb=1&ipt=3e467f5b8eb3cd6a532bdd8054112704b125d67a0305fbe1a2b0b6fe360ee616&ipo=images',
            },
        },
        {
            caption: { body: 'heyooo3' },
            media: {
                type: 'image',
                url: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi1.wp.com%2Fgeekgabpodcasts.com%2Fgiggabpodcast%2Fwp-content%2Fuploads%2Fsites%2F2%2F2017%2F08%2Fglitzy-number-3.jpg&f=1&nofb=1&ipt=435f0a31fb576c39a66e5b2313685eacee6ae7a6a7c7dc58d90dca98f232c931&ipo=images',
            },
        },
    ],
    background: backgroundColor(),
    // transitions: transitions(),
};

const videos = [...Array(3).keys()].map(() => ({ media: videoMedia(), caption: text() }));

export default {
    title: 'Screens/Slideshow',
    component: SlideshowScreen,
    parameters: {
        intl: true,
        screenDefinition: definition.find((it) => it.component === SlideshowScreen),
    },
};

export function Placeholder(storyProps) {
    return <SlideshowScreen {...storyProps} />;
}

export function Preview(storyProps) {
    return <SlideshowScreen {...storyProps} {...props} />;
}

export function Static(storyProps) {
    return <SlideshowScreen {...storyProps} {...props} />;
}

export function Capture(storyProps) {
    return <SlideshowScreen {...storyProps} {...props} />;
}

export function Edit(storyProps) {
    return <SlideshowScreen {...storyProps} />;
}

export function Normal(storyProps) {
    return <SlideshowScreen {...storyProps} {...props} />;
}

export function withCaptions(storyProps) {
    return <SlideshowScreen {...storyProps} {...props} withCaptions />;
}

export function WithVideos(storyProps) {
    return <SlideshowScreen {...storyProps} {...props} slides={videos} />;
}

export function WithHeaderFooter(storyProps) {
    return <SlideshowScreen {...storyProps} {...props} {...headerFooter()} />;
}

export function Definition(storyProps) {
    return <ScreenDefinition {...storyProps} />;
}
