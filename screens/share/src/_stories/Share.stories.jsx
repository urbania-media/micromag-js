/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

// import { text, backgroundColor, transitions, callToAction } from '../../../../.storybook/data';
import { title, backgroundColor, transitions } from '../../../../.storybook/data';
import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';
import ShareScreen from '../Share';
import definition from '../definition';

const props = {
    heading: title(),
    background: backgroundColor(),
    transitions: transitions(),
};

export default {
    title: 'Screens/Share',
    component: ShareScreen,
    parameters: {
        intl: true,
        screenDefinition: definition
    },
};

export const Placeholder = (storyProps) => <ShareScreen {...storyProps} />;

export const Preview = (storyProps) => <ShareScreen {...storyProps} {...props} />;
export const Static = (storyProps) => <ShareScreen {...storyProps} {...props} />;
export const Capture = (storyProps) => <ShareScreen {...storyProps} {...props} />;

export const Edit = (storyProps) => <ShareScreen {...storyProps} />;

export const Normal = (storyProps) => <ShareScreen {...storyProps} {...props} />;

// export const WithCallToAction = (storyProps) => (
//     <ShareScreen {...storyProps} {...props} callToAction={callToAction()} />
// );

export const Definition = (storyProps) => <ScreenDefinition {...storyProps} />;
