/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import {
    imageMedia,
    title,
    backgroundColor,
    transitions,
    swipeUpLink,
} from '../../../../.storybook/data';
import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';
import ImageTitleScreen from '../ImageTitle';
import definition from '../definition';

const props = {
    image: imageMedia(),
    imageFit: { fit: 'cover' },
    title: { body: title() },
    background: backgroundColor(),
    transitions: transitions(),
};

export default {
    title: 'Screens/ImageTitle',
    component: ImageTitleScreen,
    parameters: {
        intl: true,
        screenDefinition: definition.find((it) => it.component === ImageTitleScreen),
    },
};

export const Placeholder = (storyProps) => <ImageTitleScreen {...storyProps} />;

export const Preview = (storyProps) => <ImageTitleScreen {...storyProps} {...props} />;
export const Static = (storyProps) => <ImageTitleScreen {...storyProps} {...props} />;
export const Capture = (storyProps) => <ImageTitleScreen {...storyProps} {...props} />;

export const Edit = (storyProps) => <ImageTitleScreen {...storyProps} />;

export const Normal = (storyProps) => <ImageTitleScreen {...storyProps} {...props} />;

export const WithLink = (storyProps) => (
    <ImageTitleScreen {...storyProps} {...props} link={swipeUpLink()} />
);

export const Definition = (storyProps) => <ScreenDefinition {...storyProps} />;
