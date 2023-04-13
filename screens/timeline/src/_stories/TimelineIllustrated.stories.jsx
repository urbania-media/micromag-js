/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';
import {
    text,
    title,
    imageMedia,
    videoMedia,
    backgroundColor,
    transitions,
    headerFooter,
} from '../../../../.storybook/data';
import TimelineIllustratedScreen from '../TimelineIllustrated';
import definition from '../definition';

const props = {
    items: [...new Array(10)].map((_, index) => ({
        title: { body: title() },
        description: {
            ...text('long'),
            textStyle: { color: '#fff', alpha: 1 },
        },
        image: index % 3 === 0 ? videoMedia() : imageMedia(), // use a video for every third item
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

export const WithHeaderFooter = (storyProps) => (
    <TimelineIllustratedScreen {...storyProps} {...props} {...normalProps} {...headerFooter()} />
);

export const Definition = (storyProps) => <ScreenDefinition {...storyProps} />;
