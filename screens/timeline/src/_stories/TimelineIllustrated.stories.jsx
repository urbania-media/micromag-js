/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { text, title, image, background } from '../../../../.storybook/data';
import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';

import TimelineIllustrated from '../TimelineIllustrated';
import definition from '../definition';

const props = {
    items: [...new Array(10)].map(() => ({
        title: { body: title() },
        description: text('long'),
        image: image(),
    })),
    background: background(),
};

const normalProps = {
    bulletColor: '#FFF',
    lineColor: '#FFF',
    bulletFilled: false
};

export default {
    title: 'Screens/TimelineIllustrated',
    component: TimelineIllustrated,
    parameters: {
        intl: true,
        screenDefinition: definition.find((it) => it.component === TimelineIllustrated),
    },
};

export const Placeholder = (storyProps) => <TimelineIllustrated {...storyProps} {...props}/>;

export const Preview = (storyProps) => <TimelineIllustrated {...storyProps} {...props} {...normalProps} />;

export const Edit = (storyProps) => <TimelineIllustrated {...storyProps} />;

export const Normal = (storyProps) => <TimelineIllustrated {...storyProps} {...props} {...normalProps} />;

export const Definition = () => <ScreenDefinition definition={definition} />;
