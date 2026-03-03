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

export function Normal() {
    return <Author {...elementProps} />;
}

export function Small() {
    return <Author {...elementProps} isSmall />;
}

export function WithoutAvatar() {
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
}

export function WithoutLink() {
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
}

export function WithoutLinkAndAvatar() {
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
}

export function WithCollaborator() {
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
}
