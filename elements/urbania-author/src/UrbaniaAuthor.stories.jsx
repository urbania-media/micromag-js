/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { imageMedia } from '../../../.storybook/data';
import UrbaniaAuthor from './UrbaniaAuthor';

export default {
    component: UrbaniaAuthor,
    title: 'Elements/Urbania Author',
    parameters: {
        intl: true,
    },
};

const elementProps = {
    // visible: true,
    author: {
        name: 'Paul le fermier',
        avatar: imageMedia(),
        url: 'https://urbania.ca/auteurs/hugomeunier',
    },
};

export const Normal = () => <UrbaniaAuthor {...elementProps} width={320} height={480} />;
