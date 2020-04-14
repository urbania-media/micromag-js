/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { withKnobs } from '@storybook/addon-knobs'; // eslint-disable-line import/no-extraneous-dependencies
import { withScreenSize } from '../../../../.storybook/decorators';
import { background } from '../../../../.storybook/data';

import { Center } from '../components';

const props = {
    background: background(),
};

export default {
    component: Center,
    title: 'Screens/Panorama/Views',
    decorators: [withKnobs, withScreenSize()],
};

export const Default = () => <Center {...props} />;
