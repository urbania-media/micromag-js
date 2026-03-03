/* eslint-disable react/jsx-props-no-spreading */
import { imageMedia } from '#.storybook/data';
import preview from '#.storybook/preview';
import React from 'react';

import Author from './Author';

const meta = preview.meta({
    component: Author,
    title: 'Elements/Author',

    parameters: {
        intl: true,
    },
});

const elementProps = {
    author: {
        name: { body: '<p>Paul le fermier avec un nom assez long</p>' },
        image: imageMedia(),
        url: 'https://urbania.ca/auteurs/hugomeunier',
    },
};

export const Normal = meta.story(() => {
    return <Author {...elementProps} />;
});

export const Small = meta.story(() => {
    return <Author {...elementProps} isSmall />;
});

export const WithoutAvatar = meta.story(() => {
    return (
        <Author
            {...elementProps}
            author={{
                name: { body: '<p>Paul le fermier</p>' },
                image: null,
                url: 'https://urbania.ca/auteurs/hugomeunier',
            }}
        />
    );
});

export const WithoutLink = meta.story(() => {
    return (
        <Author
            {...elementProps}
            author={{
                name: { body: '<p>Paul le fermier</p>' },
                image: imageMedia(),
                url: null,
            }}
        />
    );
});

export const WithoutLinkAndAvatar = meta.story(() => {
    return (
        <Author
            {...elementProps}
            author={{
                name: { body: '<p>Paul le fermier</p>' },
                image: null,
                url: null,
            }}
        />
    );
});

export const WithCollaborator = meta.story(() => {
    return (
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
});
