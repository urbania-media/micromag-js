/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';
import { title, backgroundColor, transitions } from '../../../../.storybook/data';

import ContributionScreen from '../Contribution';
import definition from '../definition';

const props = {
    title: { body: title() },
    background: backgroundColor(),
    transitions: transitions(),
};

export default {
    title: 'Screens/Contribution (TODO)',
    component: ContributionScreen,
    parameters: {
        intl: true,
        screenDefinition: definition,
    },
};

export const Placeholder = (storyProps) => <ContributionScreen {...storyProps} />;

export const Preview = (storyProps) => <ContributionScreen {...storyProps} {...props} />;

export const Edit = (storyProps) => <ContributionScreen {...storyProps} />;

export const Normal = (storyProps) => <ContributionScreen {...storyProps} {...props} />;

export const Definition = (storyProps) => <ScreenDefinition {...storyProps} />;
