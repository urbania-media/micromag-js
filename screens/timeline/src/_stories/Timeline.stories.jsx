/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { text, title, background } from '../../../../.storybook/data';
import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';

import Timeline from '../Timeline';
import definition from '../definition';

const props = {
    items: [...new Array(10)].map(() => ({
        title: { body: title() },
        description: text('long'),
    })),
    background: background(),
};

const normalProps = {
    bulletColor: '#FFF',
    lineColor: '#FFF',
    bulletFilled: false
};

export default {
    title: 'Screens/Timeline',
    component: Timeline,
    parameters: {
        intl: true,
        screenDefinition: definition.find((it) => it.component === Timeline),
    },
};

export const Placeholder = (storyProps) => <Timeline {...storyProps} {...props} />;

export const Preview = (storyProps) => <Timeline {...storyProps} {...props} {...normalProps} />;

export const Edit = (storyProps) => <Timeline {...storyProps} />;

export const Normal = (storyProps) => <Timeline {...storyProps} {...props} {...normalProps} />;

export const Definition = () => <ScreenDefinition definition={definition} />;
