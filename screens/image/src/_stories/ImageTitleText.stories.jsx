/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import {
    imageMedia,
    videoMedia,
    title,
    text,
    backgroundColor,
    transitions,
    callToAction,
} from '../../../../.storybook/data';
import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';
import ImageTitleTextScreen from '../ImageTitleText';
import definition from '../definition';

const props = {
    image: imageMedia(),
    imageFit: 'cover',
    title: { body: title() },
    text: text('verylong'),
    background: backgroundColor(),
    transitions: transitions(),
};

export default {
    title: 'Screens/ImageTitleText',
    component: ImageTitleTextScreen,
    parameters: {
        intl: true,
        screenDefinition: definition.find((it) => it.component === ImageTitleTextScreen),
    },
};

export const Placeholder = (storyProps) => <ImageTitleTextScreen {...storyProps} />;

export const Preview = (storyProps) => <ImageTitleTextScreen {...storyProps} {...props} />;
export const Static = (storyProps) => <ImageTitleTextScreen {...storyProps} {...props} />;
export const Capture = (storyProps) => <ImageTitleTextScreen {...storyProps} {...props} />;

export const Edit = (storyProps) => <ImageTitleTextScreen {...storyProps} />;

export const Normal = (storyProps) => <ImageTitleTextScreen {...storyProps} {...props} />;
export const WithVideo = (storyProps) => <ImageTitleTextScreen {...storyProps} {...props} image={videoMedia()} />;

export const WithCallToAction = (storyProps) => (
    <ImageTitleTextScreen {...storyProps} {...props} callToAction={callToAction()} />
);

export const Definition = (storyProps) => <ScreenDefinition {...storyProps} />;
