/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { withKnobs } from '@storybook/addon-knobs'; // eslint-disable-line import/no-extraneous-dependencies
import { withScreenSize } from '../../../../.storybook/decorators';
import { Basic } from '../../../../.storybook/screens';
// import { paragraph, image } from '../../../../.storybook/data';

import Viewer from '../components/Viewer';

const props = {
    value: {
        components: Basic,
    },
};

export default {
    component: Viewer,
    title: 'Viewer',
    decorators: [withKnobs, withScreenSize()],
};

export const Default = () => <Viewer screen="1" {...props} />;
