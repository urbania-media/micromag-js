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
        name: { body: '<p>Paul le fermier avec un nom assez long</p>' },
        avatar: imageMedia(),
        url: 'https://urbania.ca/auteurs/hugomeunier',
    },
};

export const Normal = () => <UrbaniaAuthor {...elementProps} />;

export const Small = () => <UrbaniaAuthor {...elementProps} isSmall />;

export const WithoutAvatar = () => (
    <UrbaniaAuthor
        {...elementProps}
        author={{
            name: { body: '<p>Paul le fermier</p>' },
            avatar: null,
            url: 'https://urbania.ca/auteurs/hugomeunier',
        }}
    />
);

export const WithoutLink = () => (
    <UrbaniaAuthor
        {...elementProps}
        author={{
            name: { body: '<p>Paul le fermier</p>' },
            avatar: imageMedia(),
            url: null,
        }}
    />
);

export const WithoutLinkAndAvatar = () => (
    <UrbaniaAuthor
        {...elementProps}
        author={{
            name: { body: '<p>Paul le fermier</p>' },
            avatar: null,
            url: null,
        }}
    />
);
