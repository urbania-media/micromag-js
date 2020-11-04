/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { text, title, background } from '../../../../.storybook/data';
import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';

import Ranking from '../Ranking';
import definition from '../definition';

const props = {
    items: [...new Array(10)].map(() => ({
        title: { body: title() },
        description: text('long'),
    })),
    background: background(),
};

export default {
    title: 'Screens/Ranking',
    component: Ranking,
    parameters: {
        intl: true,
        screenDefinition: definition,
    },
};

export const Placeholder = (storyProps) => <Ranking {...storyProps} {...props} />;

export const Preview = (storyProps) => <Ranking {...storyProps} {...props} />;

export const Edit = (storyProps) => <Ranking {...storyProps} />;

export const Normal = (storyProps) => <Ranking {...storyProps} {...props} />;
export const Ascending = (storyProps) => <Ranking {...storyProps} {...props} ascending />;

export const Definition = () => <ScreenDefinition definition={definition} />;
