/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';
import {
    imageMedia,
    videoMedia,
    backgroundColor,
    transitions,
    headerFooter,
} from '../../../../.storybook/data';
import ImageScreen from '../Image';
import definition from '../definition';

const props = {
    image: imageMedia(),
    imageFit: 'cover',
    background: backgroundColor(),
    transitions: transitions(),
};

export default {
    title: 'Screens/Image',
    component: ImageScreen,
    parameters: {
        intl: true,
        screenDefinition: definition.find((it) => it.component === ImageScreen),
    },
};

export const Placeholder = (storyProps) => <ImageScreen {...storyProps} />;

export const Preview = (storyProps) => <ImageScreen {...storyProps} {...props} />;
export const Static = (storyProps) => <ImageScreen {...storyProps} {...props} />;
export const Capture = (storyProps) => <ImageScreen {...storyProps} {...props} />;

export const Edit = (storyProps) => <ImageScreen {...storyProps} />;

export const Normal = (storyProps) => <ImageScreen {...storyProps} {...props} />;
export const WithVideo = (storyProps) => (
    <ImageScreen {...storyProps} {...props} image={videoMedia()} />
);

export const WithHeaderFooter = (storyProps) => (
    <ImageScreen {...storyProps} {...headerFooter()} {...props} />
);

export const Definition = (storyProps) => <ScreenDefinition {...storyProps} />;
