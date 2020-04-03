/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { withKnobs } from '@storybook/addon-knobs'; // eslint-disable-line import/no-extraneous-dependencies
import { withScreenSize } from '../../../../.storybook/decorators';
import { audio, paragraph, image } from '../../../../.storybook/data';

import { Center } from '../components';

const props = {
    audio: audio(),
};

export default {
    component: Center,
    title: 'Screens/Audio/Views',
    decorators: [withKnobs, withScreenSize()],
};

// console.log(audio);

export const Normal = () => <Center {...props} />;

export const Album = () => <Center {...props} image={image()} />;

export const AlbumWithText = () => (
    <Center {...props} text={{ body: paragraph() }} image={image()} />
);
