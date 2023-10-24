/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import { imageMedia } from '../../../.storybook/data';
import Author from './Author';

export default {
    component: Author,
    title: 'Elements/Author',
    parameters: {
        intl: true,
    },
};

const elementProps = {
    author: {
        name: { body: '<p>Paul le fermier avec un nom assez long</p>' },
        image: imageMedia(),
        url: 'https://urbania.ca/auteurs/hugomeunier',
    },
};

export const Normal = () => <Author {...elementProps} />;

export const Small = () => <Author {...elementProps} isSmall />;

export const WithoutAvatar = () => (
    <Author
        {...elementProps}
        author={{
            name: { body: '<p>Paul le fermier</p>' },
            image: null,
            url: 'https://urbania.ca/auteurs/hugomeunier',
        }}
    />
);

export const WithoutLink = () => (
    <Author
        {...elementProps}
        author={{
            name: { body: '<p>Paul le fermier</p>' },
            image: imageMedia(),
            url: null,
        }}
    />
);

export const WithoutLinkAndAvatar = () => (
    <Author
        {...elementProps}
        author={{
            name: { body: '<p>Paul le fermier</p>' },
            image: null,
            url: null,
        }}
    />
);

export const WithCollaborator = () => (
    <Author
        {...elementProps}
        author={{
            name: { body: '<p>Jean le fermier</p>' },
            image: imageMedia(),
            url: 'https://urbania.ca/auteurs/hugomeunier',
            collaborator: {
                body: "<p>Illustrations: Paul l'illustrateur</p>",
            },
        }}
    />
);
