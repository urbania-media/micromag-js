/* eslint-disable react/jsx-props-no-spreading */
import ScreenDefinition from '#.storybook/components/ScreenDefinition';
import { backgroundColor, headerFooter, text, title, transitions } from '#.storybook/data';
import preview from '#.storybook/preview';
import React from 'react';

import TimelineScreen from '../Timeline';
import definition from '../definition';

const props = {
    title: { body: title() },
    items: [...new Array(10)].map(() => ({
        title: { body: title() },
        description: text('long'),
    })),
    background: backgroundColor(),
    transitions: transitions(),
};

const normalProps = {
    bulletColor: '#FFF',
    lineColor: '#FFF',
    bulletFilled: false,
};

const meta = preview.meta({
    title: 'Screens/Timeline',
    component: TimelineScreen,

    parameters: {
        intl: true,
        screenDefinition: definition.find((it) => it.component === TimelineScreen),
    },
});

export const Placeholder = meta.story((args) => <TimelineScreen {...args} />);

export const Preview = meta.story((args) => (
    <TimelineScreen {...args} {...props} {...normalProps} />
));
export const Static = meta.story((args) => (
    <TimelineScreen {...args} {...props} {...normalProps} />
));
export const Capture = meta.story((args) => (
    <TimelineScreen {...args} {...props} {...normalProps} />
));

export const Edit = meta.story((args) => <TimelineScreen {...args} />);

export const Normal = meta.story((args) => (
    <TimelineScreen {...args} {...props} {...normalProps} />
));

export const WithoutLine = meta.story((args) => (
    <TimelineScreen {...args} {...props} {...normalProps} withoutLine />
));

export const WithHeaderFooter = meta.story((args) => (
    <TimelineScreen {...args} {...props} {...normalProps} {...headerFooter()} />
));

export const Definition = meta.story((args) => <ScreenDefinition {...args} />);
