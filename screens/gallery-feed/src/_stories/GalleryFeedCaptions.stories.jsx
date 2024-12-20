/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import {
    imagesWithCaptions,
    backgroundColor,
    transitions,
    callToAction,
} from '../../../../.storybook/data';
import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';
import GalleryFeedCaptionsScreen from '../GalleryFeedCaptions';
import definition from '../definition';

const props = {
    images: imagesWithCaptions({ count: 5 }),
    background: backgroundColor(),
    transitions: transitions(),
};

export default {
    title: 'Screens/GalleryFeedCaptions',
    component: GalleryFeedCaptionsScreen,
    parameters: {
        intl: true,
        screenDefinition: definition.find((it) => it.component === GalleryFeedCaptionsScreen),
    },
};

export const Placeholder = (storyProps) => <GalleryFeedCaptionsScreen {...storyProps} />;

export const Preview = (storyProps) => <GalleryFeedCaptionsScreen {...storyProps} {...props} />;
export const Static = (storyProps) => <GalleryFeedCaptionsScreen {...storyProps} {...props} />;
export const Capture = (storyProps) => <GalleryFeedCaptionsScreen {...storyProps} {...props} />;

export const Edit = (storyProps) => <GalleryFeedCaptionsScreen {...storyProps} />;

export const Normal = (storyProps) => <GalleryFeedCaptionsScreen {...storyProps} {...props} />;

export const WithCallToAction = (storyProps) => (
    <GalleryFeedCaptionsScreen {...storyProps} {...props} callToAction={callToAction()} />
);

export const Definition = (storyProps) => <ScreenDefinition {...storyProps} />;
