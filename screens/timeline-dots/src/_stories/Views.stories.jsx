/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { withKnobs, select } from '@storybook/addon-knobs'; // eslint-disable-line import/no-extraneous-dependencies
import { withScreenSize } from '../../../../.storybook/decorators';

import TimelineDots from '../index';

import { Text, Image, Heading } from '../components';

export default {
    component: Text,
    title: 'Screens/TimelineDots',
    decorators: [withKnobs, withScreenSize()],
};

export const Layouts = () => <TimelineDots layout={select('text')} />;

export const TextTimeline = () => <Text renderFormat="view" />;

export const ImageTimeline = () => <Image renderFormat="view" />;

export const HeadingTimeline = () => <Heading renderFormat="view" />;
