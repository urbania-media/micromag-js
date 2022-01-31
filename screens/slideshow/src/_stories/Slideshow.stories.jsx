/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';
import {
    backgroundColor,
    callToAction,
    imageMedia,
    textStyle as textStyleExample,
    title as titleExample,
    text as textExample,
    transitions,
    videoMedia,
} from '../../../../.storybook/data';
import definition from '../definition';
import SlideshowScreen from '../Slideshow';

const props = {
    title: { body: titleExample(), textStyle: textStyleExample() },
    slides: [...Array(3).keys()].map((_, i) => ({
        visual: imageMedia({ width: 800 + i, height: 500 - i }),
        caption: i % 2 === 0 ? textExample() : { body: titleExample() }
    })),
    background: backgroundColor(),
    transitions: transitions(),
};

const videos = [...Array(3).keys()].map((_, i) => ({
    visual: videoMedia(),
    caption: i % 2 === 0 ? textExample() : { body: titleExample() }
}));

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

export function WithCallToAction(storyProps) {
    return <SlideshowScreen {...storyProps} {...props} callToAction={callToAction()} />;
}

export function WithVideos(storyProps) {
    return <SlideshowScreen {...storyProps} {...props} slides={videos} />;
}

export function Definition(storyProps) {
    return <ScreenDefinition {...storyProps} />;
}
