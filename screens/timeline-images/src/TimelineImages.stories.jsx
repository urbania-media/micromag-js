import React from 'react';
import { Story, StoryByLayout } from '@micromag/core';
import { withKnobs, boolean } from '@storybook/addon-knobs'; // eslint-disable-line import/no-extraneous-dependencies
import TimelineImages from './TimelineImages';
import { ScreenSize } from './storybook';

export default {
    component: TimelineImages,
    title: 'Screens/TimelineImages',
    decorators: [withKnobs, ScreenSize()],
};

export const Placeholders = () => (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
        <StoryByLayout
            layout={{ name: 'default' }}
            component={TimelineImages}
            itemProps={{ isPlaceholder: true }}
        />
    </div>
);

export const Exemple = () => (
    <Story>
        <TimelineImages isPlaceholder={boolean('isPlaceholder', false)} />
    </Story>
);
