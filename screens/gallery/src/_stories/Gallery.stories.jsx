/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';
import { backgroundColor, callToAction, images, transitions } from '../../../../.storybook/data';
import definition from '../definition';
import GalleryScreen from '../Gallery';

const props = {
    images: images({ count: 20 }),
    background: backgroundColor(),
    transitions: transitions(),
};

export default {
    title: 'Screens/Gallery',
    component: GalleryScreen,
    parameters: {
        intl: true,
        screenDefinition: definition.find((it) => it.component === GalleryScreen),
    },
};

export function Placeholder(storyProps) {
    return <GalleryScreen {...storyProps} />;
}

export function Preview(storyProps) {
    return <GalleryScreen {...storyProps} {...props} />;
}
export function Static(storyProps) {
    return <GalleryScreen {...storyProps} {...props} />;
}
export function Capture(storyProps) {
    return <GalleryScreen {...storyProps} {...props} />;
}

export function Edit(storyProps) {
    return <GalleryScreen {...storyProps} />;
}

export function Normal(storyProps) {
    return <GalleryScreen {...storyProps} {...props} />;
}

export function WithCallToAction(storyProps) {
    return <GalleryScreen {...storyProps} {...props} callToAction={callToAction()} />;
}

export function Definition(storyProps) {
    return <ScreenDefinition {...storyProps} />;
}
