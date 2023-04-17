/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';
import {
    imageMedia,
    videoMedia,
    title,
    text,
    backgroundColor,
    transitions,
    headerFooter,
    header,
    footer,
} from '../../../../.storybook/data';
import ImageTitleTextScreen from '../ImageTitleText';
import definition from '../definition';

const props = {
    image: imageMedia(),
    imageFit: 'cover',
    title: { body: title() },
    text: text('short'),
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

export const WithVideo = (storyProps) => (
    <ImageTitleTextScreen {...storyProps} {...props} image={videoMedia()} />
);

export const WithHeaderFooter = (storyProps) => (
    <ImageTitleTextScreen {...storyProps} {...props} {...headerFooter()} />
);

export const WithHeader = (storyProps) => (
    <ImageTitleTextScreen {...storyProps} {...props} header={header()} />
);

export const WithFooter = (storyProps) => (
    <ImageTitleTextScreen {...storyProps} {...props} footer={footer()} />
);

export const Definition = (storyProps) => <ScreenDefinition {...storyProps} />;
