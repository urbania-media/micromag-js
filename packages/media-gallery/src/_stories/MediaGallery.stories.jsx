/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';

import sound from '../../../../.storybook/data/files/test.mp3';
import video from '../../../../.storybook/data/files/test.mp4';
import withUppy from '../../../../.storybook/decorators/withUppy';
import { ApiProvider } from '../../../data/src/contexts/ApiContext';
import FieldsProvider from '../../../fields/src/FieldsProvider';
import MediaGallery from '../components/MediaGallery';

import list from './list.json';

const hasWindow = typeof window !== 'undefined';
const apiBaseUrl = hasWindow ? `${window.location.protocol}//${window.location.host}/api` : '/api';

const props = {
    medias: [
        {
            id: '1',
            type: 'video',
            thumbnail_url: 'https://picsum.photos/id/100/300/300',
            name: 'uuuuurbaniaDog1sdfasdflasd s df adsf asdfasdfgasdf dasgf ads gadsfg adsfg adfg dsfg.mov',
            url: video,
            metadata: {
                user: { id: 1, name: 'paul ' },
            },
        },
        {
            id: '2',
            type: 'video',
            thumbnail_url: 'https://picsum.photos/id/200/300/300',
            name: 'moon.mov',
            url: video,
        },
        {
            id: '3',
            type: 'video',
            thumbnail_url: 'https://picsum.photos/id/300/300/300',
            name: 'sea.mov',
            url: video,
        },
        {
            id: '4',
            type: 'image',
            thumbnail_url: 'https://picsum.photos/id/400/300/300',
            name: 'moondog.jpg',
            url: 'https://picsum.photos/id/400/800/800',
        },
        {
            id: '5',
            type: 'image',
            thumbnail_url: 'https://picsum.photos/id/500/300/300',
            name: 'urbaniaDog5.jpg',
            url: 'https://picsum.photos/id/500/800/800',
        },
        {
            id: '6',
            type: 'audio',
            thumbnail_url: 'https://picsum.photos/id/600/300/300',
            name: 'Cool thang',
            url: sound,
        },
    ],
};

export default {
    component: MediaGallery,
    title: 'Editor/MediaGallery',
    decorators: [withUppy],
    parameters: {
        screenSize: true,
        intl: true,
    },
};

// eslint-disable-next-line react/prop-types
const GalleryContainer = ({ value: defaultValue, ...containerProps }) => {
    const [value, setValue] = useState(defaultValue);
    return (
        <ApiProvider baseUrl={apiBaseUrl}>
            <FieldsProvider>
                <MediaGallery {...containerProps} selectedMedia={value} onChange={setValue} />
            </FieldsProvider>
        </ApiProvider>
    );
};

export function Normal() {
    return <GalleryContainer />;
}

export function WithTypesRequest() {
    return <GalleryContainer type={['image', 'video']} />;
}

export function WithTestMedia() {
    return <GalleryContainer {...props} type="image" />;
}

export function WithSelectedMedia() {
    return (
        <GalleryContainer
            {...props}
            type="image"
            value={{
                id: '1',
                type: 'video',
                thumbnail_url: 'https://picsum.photos/id/100/300/300',
                name: 'uuuuurbaniaDog1sdfasdflasdsdfadsfasdfasdfgasdf dasgf ads gadsfg adsfg adfg dsfg.mov',
                url: video,
                metadata: {
                    user: { id: 1, name: 'paul ' },
                },
            }}
        />
    );
}

export function WithList() {
    return <GalleryContainer medias={list} />;
}

export function WithFontType() {
    return <GalleryContainer type="font" />;
}
