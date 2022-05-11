/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';
import {
    text,
    title,
    backgroundImage,
    transitions,
    callToAction,
} from '../../../../.storybook/data';
import Recommendation from '../Recommendation';
import definition from '../definition';

const props = {
    // category: { body: title() },
    // date: text('short'),
    // title: { body: title() },
    // sponsor: text('short'),
    // description: text('medium'),
    category: { body: 'Pièce de théâtre' },
    date: { body: 'du 14 FÉVRIER au 5 MARS' },
    title: { body: 'Blackbird' },
    sponsor: { body: 'suggéré par banque national' },
    description: {
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        // body: 'testing testing one two one two mic check one two one two',
    },
    background: backgroundImage(),
    transitions: transitions(),
};

export default {
    title: 'Urbania Screens/Recommendation',
    component: Recommendation,
    parameters: {
        intl: true,
        screenDefinition: definition.find((it) => it.component === Recommendation),
    },
};

export const Placeholder = (storyProps) => <Recommendation {...storyProps} />;

export const Preview = (storyProps) => <Recommendation {...storyProps} {...props} />;
export const Static = (storyProps) => <Recommendation {...storyProps} {...props} />;
export const Capture = (storyProps) => <Recommendation {...storyProps} {...props} />;

export const Edit = (storyProps) => <Recommendation {...storyProps} />;

export const Normal = (storyProps) => <Recommendation {...storyProps} {...props} />;

export const WithCallToAction = (storyProps) => (
    <Recommendation {...storyProps} {...props} callToAction={callToAction()} />
);

export const Definition = (storyProps) => <ScreenDefinition {...storyProps} />;
