/* eslint-disable react/jsx-props-no-spreading */
import ScreenDefinition from '#.storybook/components/ScreenDefinition';
import { backgroundColor, headerFooter, title, transitions } from '#.storybook/data';
import preview from '#.storybook/preview';
import React from 'react';

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

const meta = preview.meta({
    title: 'Screens/Contribution',
    component: ContributionScreen,

    parameters: {
        intl: true,
        screenDefinition: definition,
    },
});

export const Placeholder = meta.story((args) => <ContributionScreen {...args} />);

export const Preview = meta.story((args) => <ContributionScreen {...args} {...props} />);

export const Static = meta.story((args) => <ContributionScreen {...args} {...props} />);

export const Capture = meta.story((args) => <ContributionScreen {...args} {...props} />);

export const Edit = meta.story((args) => <ContributionScreen {...args} />);

export const Normal = meta.story((args) => <ContributionScreen {...args} {...props} />);

export const WithHeaderFooter = meta.story((args) => (
    <ContributionScreen {...args} {...headerFooter()} {...props} />
));

export const Definition = meta.story((args) => <ScreenDefinition {...args} />);
