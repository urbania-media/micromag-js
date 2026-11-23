/* eslint-disable react/jsx-props-no-spreading */
import ScreenDefinition from '#.storybook/components/ScreenDefinition';
import {
    backgroundColor,
    headerFooter,
    imageMedia,
    text,
    title,
    transitions,
    videoMedia,
} from '#.storybook/data';
import preview from '#.storybook/preview';
import React from 'react';

import TimelineIllustratedScreen from '../TimelineIllustrated';
import definition from '../definition';

const props = {
    items: [...new Array(10)].map((_, index) => ({
        title: { body: title() },
        description:
            Math.random() > 0.5
                ? {
                      ...text('long'),
                      textStyle: { color: '#fff', alpha: 1 },
                  }
                : null,
        // eslint-disable-next-line no-nested-ternary
        image: index % 3 === 0 ? null : Math.random() > 0.5 ? imageMedia() : videoMedia(), // use a video for every third item
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
    title: 'Screens/TimelineIllustrated',
    component: TimelineIllustratedScreen,

    parameters: {
        intl: true,
        screenDefinition: definition.find((it) => it.component === TimelineIllustratedScreen),
    },
});

export const Placeholder = meta.story((args) => <TimelineIllustratedScreen {...args} />);

export const Preview = meta.story((args) => (
    <TimelineIllustratedScreen {...args} {...props} {...normalProps} />
));
export const Static = meta.story((args) => (
    <TimelineIllustratedScreen {...args} {...props} {...normalProps} />
));
export const Capture = meta.story((args) => (
    <TimelineIllustratedScreen {...args} {...props} {...normalProps} />
));

export const Edit = meta.story((args) => <TimelineIllustratedScreen {...args} />);

export const Normal = meta.story((args) => (
    <TimelineIllustratedScreen {...args} {...props} {...normalProps} />
));

export const WithoutLine = meta.story((args) => (
    <TimelineIllustratedScreen {...args} {...props} {...normalProps} withoutLine />
));

export const WithHeaderFooter = meta.story((args) => (
    <TimelineIllustratedScreen {...args} {...props} {...normalProps} {...headerFooter()} />
));

export const Definition = meta.story((args) => <ScreenDefinition {...args} />);
