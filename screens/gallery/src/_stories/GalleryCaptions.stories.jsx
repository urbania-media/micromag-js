/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import { imagesWithCaptions, backgroundColor, transitions } from '../../../../.storybook/data';
import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';
import GalleryCaptionsScreen from '../GalleryCaptions';
import definition from '../definition';

const props = {
    images: imagesWithCaptions({ count: 20 }),
    background: backgroundColor(),
    transitions: transitions(),
};

export default {
    title: 'Screens/GalleryCaptions',
    component: GalleryCaptionsScreen,
    parameters: {
        intl: true,
        screenDefinition: definition.find((it) => it.component === GalleryCaptionsScreen),
    },
};

export const Placeholder = (storyProps) => <GalleryCaptionsScreen {...storyProps} />;

export const Preview = (storyProps) => <GalleryCaptionsScreen {...storyProps} {...props} />;
export const Static = (storyProps) => <GalleryCaptionsScreen {...storyProps} {...props} />;
export const Capture = (storyProps) => <GalleryCaptionsScreen {...storyProps} {...props} />;

export const Edit = (storyProps) => <GalleryCaptionsScreen {...storyProps} />;

export const Normal = (storyProps) => <GalleryCaptionsScreen {...storyProps} {...props} />;

export const Definition = (storyProps) => <ScreenDefinition {...storyProps} />;
