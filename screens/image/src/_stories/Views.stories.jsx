/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { withKnobs } from '@storybook/addon-knobs'; // eslint-disable-line import/no-extraneous-dependencies
import { withScreenSize } from '../../../../.storybook/decorators';
import { imageWithRandomSize, background, shortText } from '../../../../.storybook/data';

import { Top, Center, Bottom } from '../components';

const props = {
    image: imageWithRandomSize(),
    background: background(),
};

export default {
    component: Center,
    title: 'Screens/Image/Views',
    decorators: [withKnobs, withScreenSize()],
};

export const ViewTop = () => <Top {...props} />;

export const ViewCenter = () => <Center {...props} />;

export const ViewBottom = () => <Bottom {...props} />;

export const ViewCenterWithText = () => <Center {...props} text={{ body: shortText() }} />;
