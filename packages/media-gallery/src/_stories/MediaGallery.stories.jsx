/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { MemoryRouter } from 'react-router';

import { ApiProvider } from '../../../data/src/contexts/ApiContext';
import { OrganisationProvider } from '../../../app/src/contexts/OrganisationContext';

import FieldsProvider from '../../../fields/src/components/FieldsProvider';

import video from '../../../../.storybook/data/test.mp4';
import sound from '../../../../.storybook/data/test.mp3';
// import { paragraph, image } from '../../../../.storybook/data';

import MediaGallery from '../components/MediaGallery';

const apiBaseUrl = `${window.location.protocol}//${window.location.host}/api`;

const props = {
    medias: [
        {
            id: 1,
            type: 'video',
            thumbnail_url: 'https://picsum.photos/id/100/300/300',
            name:
                'uuuuurbaniaDog1 sdfasdflasd s df adsf asdfasdfgasdf dasgf ads gadsfg adsfg adfg dsfg.mov',
            src: video,
        },
        {
            id: 2,
            type: 'video',
            thumbnail_url: 'https://picsum.photos/id/200/300/300',
            name: 'moon.mov',
            src: video,
        },
        {
            id: 3,
            type: 'video',
            thumbnail_url: 'https://picsum.photos/id/300/300/300',
            name: 'sea.mov',
            src: video,
        },
        {
            id: 4,
            type: 'image',
            thumbnail_url: 'https://picsum.photos/id/400/300/300',
            name: 'moondog.jpg',
            src: 'https://picsum.photos/id/400/800/800',
        },
        {
            id: 5,
            type: 'image',
            thumbnail_url: 'https://picsum.photos/id/500/300/300',
            name: 'urbaniaDog5.jpg',
            src: 'https://picsum.photos/id/500/800/800',
        },
        {
            id: 6,
            type: 'audio',
            thumbnail_url: 'https://picsum.photos/id/600/300/300',
            name: 'Cool thang',
            src: sound,
        },
    ],
    user: {
        searches: ['chose', 'chat', 'sea', 'moondog'],
    },
};

export default {
    component: MediaGallery,
    title: 'MediaGallery',
    parameters: {
        screenSize: true,
        intl: true,
    },
};

export const Normal = () => (
    <ApiProvider baseUrl={apiBaseUrl}>
        <FieldsProvider>
            <OrganisationProvider>
                <MemoryRouter>
                    <MediaGallery {...props} />
                </MemoryRouter>
            </OrganisationProvider>
        </FieldsProvider>
    </ApiProvider>
);
