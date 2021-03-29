/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import {
    text,
    title,
    imageMedia,
    backgroundColor,
    transitions,
    swipeUpLink,
} from '../../../../.storybook/data';
import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';
import TimelineIllustratedScreen from '../TimelineIllustrated';
import definition from '../definition';

const props = {
    items: [...new Array(10)].map(() => ({
        title: { body: title() },
        description: text('long'),
        image: imageMedia(),
    })),
    background: backgroundColor(),
    transitions: transitions(),
};

const normalProps = {
    bulletColor: '#FFF',
    lineColor: '#FFF',
    bulletFilled: false,
};

export default {
    title: 'Screens/TimelineIllustrated',
    component: TimelineIllustratedScreen,
    parameters: {
        intl: true,
        screenDefinition: definition.find((it) => it.component === TimelineIllustratedScreen),
    },
};

export const Placeholder = (storyProps) => <TimelineIllustratedScreen {...storyProps} />;

export const Preview = (storyProps) => (
    <TimelineIllustratedScreen {...storyProps} {...props} {...normalProps} />
);
export const Static = (storyProps) => (
    <TimelineIllustratedScreen {...storyProps} {...props} {...normalProps} />
);
export const Capture = (storyProps) => (
    <TimelineIllustratedScreen {...storyProps} {...props} {...normalProps} />
);

export const Edit = (storyProps) => <TimelineIllustratedScreen {...storyProps} />;

export const Normal = (storyProps) => (
    <TimelineIllustratedScreen {...storyProps} {...props} {...normalProps} />
);

export const WithLink = (storyProps) => (
    <TimelineIllustratedScreen {...storyProps} {...props} {...normalProps} link={swipeUpLink()} />
);

export const Definition = (storyProps) => <ScreenDefinition {...storyProps} />;
