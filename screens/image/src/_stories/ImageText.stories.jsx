/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';
import {
    imageMedia,
    videoMedia,
    text,
    backgroundColor,
    transitions,
    headerFooter,
} from '../../../../.storybook/data';
import ImageTextScreen from '../ImageText';
import definition from '../definition';

const props = {
    image: imageMedia(),
    imageFit: 'cover',
    text: text('verylong'),
    background: backgroundColor(),
    transitions: transitions(),
};

export default {
    title: 'Screens/ImageText',
    component: ImageTextScreen,
    parameters: {
        intl: true,
        screenDefinition: definition.find((it) => it.component === ImageTextScreen),
    },
};

export const Placeholder = (storyProps) => <ImageTextScreen {...storyProps} />;

export const Preview = (storyProps) => <ImageTextScreen {...storyProps} {...props} />;
export const Static = (storyProps) => <ImageTextScreen {...storyProps} {...props} />;
export const Capture = (storyProps) => <ImageTextScreen {...storyProps} {...props} />;

export const Edit = (storyProps) => <ImageTextScreen {...storyProps} />;

export const Normal = (storyProps) => <ImageTextScreen {...storyProps} {...props} />;
export const WithVideo = (storyProps) => (
    <ImageTextScreen {...storyProps} {...props} image={videoMedia()} />
);

export const WithHeaderFooter = (storyProps) => (
    <ImageTextScreen {...storyProps} {...props} {...headerFooter()} />
);

export const Definition = (storyProps) => <ScreenDefinition {...storyProps} />;
