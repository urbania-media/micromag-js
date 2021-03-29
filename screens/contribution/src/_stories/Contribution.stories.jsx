/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';
import { title, backgroundColor, transitions, swipeUpLink } from '../../../../.storybook/data';
import ContributionScreen from '../Contribution';
import definition from '../definition';

const props = {
    title: { body: title() },
    name: { label: 'Votre nom', textStyle: null },
    message: { label: 'Votre message', textStyle: null },
    submit: { body: 'Envoyer', textStyle: null },
    nameStyle: null,
    messageStyle: null,
    background: backgroundColor(),
    transitions: transitions(),
};

export default {
    title: 'Screens/Contribution',
    component: ContributionScreen,
    parameters: {
        intl: true,
        screenDefinition: definition,
    },
};

export const Placeholder = (storyProps) => <ContributionScreen {...storyProps} />;

export const Preview = (storyProps) => <ContributionScreen {...storyProps} {...props} />;
export const Static = (storyProps) => <ContributionScreen {...storyProps} {...props} />;
export const Capture = (storyProps) => <ContributionScreen {...storyProps} {...props} />;

export const Edit = (storyProps) => <ContributionScreen {...storyProps} />;

export const Normal = (storyProps) => <ContributionScreen {...storyProps} {...props} />;

export const WithLink = (storyProps) => (
    <ContributionScreen {...storyProps} {...props} link={swipeUpLink()} />
);

export const Definition = (storyProps) => <ScreenDefinition {...storyProps} />;
