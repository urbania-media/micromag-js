/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';
import { text, backgroundColor, transitions, callToAction } from '../../../../.storybook/data';
import Recommendation from '../Recommendation';
import definition from '../definition';

const props = {
    text: text('verylong'),
    background: backgroundColor(),
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
