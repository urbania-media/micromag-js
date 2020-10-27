/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { MemoryRouter } from 'react-router';

import { ApiProvider } from '../../../data/src/contexts/ApiContext';
import { OrganisationProvider } from '../../../app/src/contexts/OrganisationContext';

import FieldsProvider from '../../../fields/src/components/FieldsProvider';
// import { paragraph, image } from '../../../../.storybook/data';

import MediaGallery from '../components/MediaGallery';

const apiBaseUrl = `${window.location.protocol}//${window.location.host}/api`;

const props = {
    medias: [
        {
            id: 1,
            type: 'video',
            thumbnail_url: 'https://picsum.photos/id/1/300/300',
            name: 'uuuuurbaniaDog1.mov',
        },
        {
            id: 2,
            type: 'video',
            thumbnail_url: 'https://picsum.photos/id/2/300/300',
            name: 'moon.mov',
        },
        {
            id: 3,
            type: 'video',
            thumbnail_url: 'https://picsum.photos/id/3/300/300',
            name: 'sea.mov',
        },
        {
            id: 4,
            type: 'image',
            thumbnail_url: 'https://picsum.photos/id/4/300/300',
            name: 'moondog.jpg',
        },
        {
            id: 5,
            type: 'image',
            thumbnail_url: 'https://picsum.photos/id/5/300/300',
            name: 'urbaniaDog5.jpg',
        },
        {
            id: 6,
            type: 'audio',
            thumbnail_url: 'https://picsum.photos/id/5/300/300',
            name: 'Cool thang',
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
