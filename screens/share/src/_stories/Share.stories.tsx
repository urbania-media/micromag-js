/* eslint-disable react/jsx-props-no-spreading */
import ScreenDefinition from '#.storybook/components/ScreenDefinition';
import { backgroundColor, color, headerFooter, title, transitions } from '#.storybook/data';
import preview from '#.storybook/preview';
import React from 'react';

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
    buttonsStyle: {
        // border: '1px solid #000',
        borderColor: '#000',
        borderStyle: 'solid',
        borderWidth: '1',
    },
};

const meta = preview.meta({
    title: 'Screens/Share',
    component: ShareScreen,

    parameters: {
        intl: true,
        screenDefinition: definition,
    },
});

const styles = {
    buttonsStyle: {
        backgroundColor: color(),
        borderRadius: '10px',
    },
    buttonsTextStyle: {
        // fontSize: '20px',
    },
};

export const Placeholder = meta.story((args) => <ShareScreen {...args} />);

export const Preview = meta.story((args) => <ShareScreen {...args} {...props} />);

export const Static = meta.story((args) => <ShareScreen {...args} {...props} />);

export const Capture = meta.story((args) => <ShareScreen {...args} {...props} />);

export const Edit = meta.story((args) => <ShareScreen {...args} />);

export const Normal = meta.story((args) => <ShareScreen {...args} {...props} {...styles} />);

export const WithHeading = meta.story((args) => (
    <ShareScreen {...args} {...props} {...styles} heading={{ body: 'Headings are great' }} />
));

export const WithOnlyFacebook = meta.story((args) => (
    <ShareScreen
        {...args}
        {...props}
        options={{
            email: false,
            facebook: true,
            twitter: false,
            linkedin: false,
        }}
    />
));

export const WithCentered = meta.story((args) => (
    <ShareScreen
        {...args}
        {...props}
        options={{
            email: false,
            facebook: true,
            twitter: true,
            linkedin: true,
        }}
        centered
    />
));

export const WithAllPlatforms = meta.story((args) => (
    <ShareScreen
        {...args}
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
));

export const WithHeaderFooter = meta.story((args) => (
    <ShareScreen {...args} {...headerFooter()} {...props} />
));

export const Definition = meta.story((args) => <ScreenDefinition {...args} />);
