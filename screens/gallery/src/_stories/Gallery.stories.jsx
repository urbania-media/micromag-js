/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';
import { backgroundColor, headerFooter, images, transitions } from '../../../../.storybook/data';
import GalleryScreen from '../Gallery';
import definition from '../definition';

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

export function WithHeaderFooter(storyProps) {
    return <GalleryScreen {...storyProps} {...headerFooter()} {...props} />;
}

export function Definition(storyProps) {
    return <ScreenDefinition {...storyProps} />;
}
