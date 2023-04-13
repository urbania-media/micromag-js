/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';
import {
    backgroundColor,
    headerFooter,
    imagesWithCaptions,
    transitions,
} from '../../../../.storybook/data';
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

export function Placeholder(storyProps) {
    return <GalleryCaptionsScreen {...storyProps} />;
}

export function Preview(storyProps) {
    return <GalleryCaptionsScreen {...storyProps} {...props} />;
}
export function Static(storyProps) {
    return <GalleryCaptionsScreen {...storyProps} {...props} />;
}
export function Capture(storyProps) {
    return <GalleryCaptionsScreen {...storyProps} {...props} />;
}

export function Edit(storyProps) {
    return <GalleryCaptionsScreen {...storyProps} />;
}

export function Normal(storyProps) {
    return <GalleryCaptionsScreen {...storyProps} {...props} />;
}

export function WithHeaderFooter(storyProps) {
    return <GalleryCaptionsScreen {...storyProps} {...headerFooter()} {...props} />;
}

export function Definition(storyProps) {
    return <ScreenDefinition {...storyProps} />;
}
