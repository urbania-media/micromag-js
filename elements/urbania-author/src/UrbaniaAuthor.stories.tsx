import { imageMedia } from '#.storybook/data';
import preview from '#.storybook/preview';
import React from 'react';

import UrbaniaAuthor from './UrbaniaAuthor';

const meta = preview.meta({
    component: UrbaniaAuthor,
    title: 'Elements/Urbania Author',

    parameters: {
        intl: true,
    },
});

const elementProps = {
    // visible: true,
    author: {
        name: { body: '<p>Paul le fermier avec un nom assez long</p>' },
        image: imageMedia(),
        url: 'https://urbania.ca/auteurs/hugomeunier',
    },
};

export const Normal = meta.story(() => {
    return <UrbaniaAuthor {...elementProps} />;
});

export const Small = meta.story(() => {
    return <UrbaniaAuthor {...elementProps} isSmall />;
});

export const WithoutAvatar = meta.story(() => {
    return (
        <UrbaniaAuthor
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
        <UrbaniaAuthor
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
        <UrbaniaAuthor
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
        <UrbaniaAuthor
            {...elementProps}
            author={{
                name: { body: '<p>Jean le fermier</p>' },
                image: imageMedia(),
                url: 'https://urbania.ca/auteurs/hugomeunier',
                collaborator: {
                    body: "<p>Paul l'illustrateur</p>",
                },
            }}
        />
    );
});
