/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';
// import { text, backgroundColor, transitions, callToAction } from '../../../../.storybook/data';
import { title, backgroundColor, transitions } from '../../../../.storybook/data';
import ShareScreen from '../Share';
import definition from '../definition';

const props = {
    heading: title(),
    shareUrl: null,
    options: {
        email: true,
        facebook: true,
        twitter: true,
        linkedin: true,
    },
    background: backgroundColor(),
    transitions: transitions(),
};

export default {
    title: 'Screens/Share',
    component: ShareScreen,
    parameters: {
        intl: true,
        screenDefinition: definition,
    },
};

export const Placeholder = (storyProps) => <ShareScreen {...storyProps} />;

export const Preview = (storyProps) => <ShareScreen {...storyProps} {...props} />;
export const Static = (storyProps) => <ShareScreen {...storyProps} {...props} />;
export const Capture = (storyProps) => <ShareScreen {...storyProps} {...props} />;

export const Edit = (storyProps) => <ShareScreen {...storyProps} />;

export const Normal = (storyProps) => <ShareScreen {...storyProps} {...props} />;

export const WithOnlyFacebook = (storyProps) => (
    <ShareScreen
        {...storyProps}
        {...props}
        options={{
            email: false,
            facebook: true,
            twitter: false,
            linkedin: false,
        }}
    />
);

export const WithCentered = (storyProps) => (
    <ShareScreen
        {...storyProps}
        {...props}
        options={{
            email: false,
            facebook: true,
            twitter: true,
            linkedin: true,
        }}
        centered
    />
);

export const WithAllPlatforms = (storyProps) => (
    <ShareScreen
        {...storyProps}
        {...props}
        options={{
            email: true,
            facebook: true,
            twitter: true,
            linkedin: true,
            facebookMessenger: false,
            whatsapp: true,
        }}
    />
);

// export const WithCallToAction = (storyProps) => (
//     <ShareScreen {...storyProps} {...props} callToAction={callToAction()} />
// );

export const Definition = (storyProps) => <ScreenDefinition {...storyProps} />;
