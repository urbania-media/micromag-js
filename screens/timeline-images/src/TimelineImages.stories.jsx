import React from 'react';
import { withKnobs, boolean } from '@storybook/addon-knobs'; // eslint-disable-line import/no-extraneous-dependencies
import TimelineImages from './TimelineImages';
import { ScreenSize } from './storybook';

export default {
    component: TimelineImages,
    title: 'Screens/TimelineImages',
    decorators: [withKnobs, ScreenSize()],
};

export const Exemple = () => <TimelineImages isPlaceholder={boolean('isPlaceholder', false)} />;
