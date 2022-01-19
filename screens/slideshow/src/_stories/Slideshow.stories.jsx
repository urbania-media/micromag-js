/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';
import {
    backgroundColor,
    imageMedia,
    text,
    transitions,
    videoMedia,
} from '../../../../.storybook/data';
import definition from '../definition';
import SlideshowScreen from '../Slideshow';

const props = {
    slides: [...Array(3).keys()].map(() => ({ visual: imageMedia(), caption: text() })),
    background: backgroundColor(),
    transitions: transitions(),
};

const videos = [...Array(3).keys()].map(() => ({ visual: videoMedia(), caption: text() }));

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

export function WithVideos(storyProps) {
    return <SlideshowScreen {...storyProps} {...props} slides={videos} />;
}

export function Definition(storyProps) {
    return <ScreenDefinition {...storyProps} />;
}
