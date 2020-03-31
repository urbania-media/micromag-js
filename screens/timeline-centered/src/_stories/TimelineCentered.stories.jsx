/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { withKnobs, select } from '@storybook/addon-knobs'; // eslint-disable-line import/no-extraneous-dependencies
import { withScreenSize } from '../../../../.storybook/decorators';
import { title, description } from '../../../../.storybook/data';

import TimelineCentered from '../index';
import { Text, Image } from '../components';

const items = [
    { heading: { body: title() }, text: { body: description() } },
    { heading: { body: title() }, text: { body: description() } },
    { heading: { body: title() }, text: { body: description() } },
];

const itemsWithImage = [
    {
        image: {
            url: 'https://picsum.photos/400/300',
        },
        text: { body: description() },
    },
    {
        image: {
            url: 'https://picsum.photos/400/400',
        },
        text: { body: description() },
    },
    {
        image: {
            url: 'https://picsum.photos/400/500',
        },
        text: { body: description() },
    },
];

const background = {
    image: {
        url: 'https://picsum.photos/400/600',
    },
    color: '#ddd',
};

const props = {
    items,
    background,
};

export default {
    component: Text,
    title: 'Screens/TimelineCentered',
    decorators: [withKnobs, withScreenSize()],
};

export const Layouts = () => <TimelineCentered layout={select('text')} {...props} />;

export const TextTimeline = () => <Text renderFormat="view" {...props} background />;

export const ImageTimeline = () => <Image renderFormat="view" items={itemsWithImage} {...props} />;
