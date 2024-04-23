/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';

// import MicromagFieldsProvider from '../../../fields/src/FieldsProvider';
import { QueryProvider } from '@panneau/data';
import DisplaysProvider from '@panneau/displays';
import FieldsProvider from '@panneau/fields';
import FiltersProvider from '@panneau/filters';

import sound from '../../../../.storybook/data/files/test.mp3';
import video from '../../../../.storybook/data/files/test.mp4';
import withUppy from '../../../../.storybook/decorators/withUppy';
import { ApiProvider } from '../../../data/src/contexts/ApiContext';
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
const GalleryContainer = ({ value: defaultValue = null, ...containerProps }) => {
    const [value, setValue] = useState(defaultValue);
    return (
        <div style={{ padding: 20 }}>
            <ApiProvider baseUrl={apiBaseUrl}>
                <QueryProvider>
                    <FieldsProvider>
                        <DisplaysProvider>
                            <FiltersProvider>
                                <MediaGallery
                                    {...containerProps}
                                    value={value}
                                    onChange={setValue}
                                />
                            </FiltersProvider>
                        </DisplaysProvider>
                    </FieldsProvider>
                </QueryProvider>
            </ApiProvider>
        </div>
    );
};

export function Normal() {
    return <GalleryContainer />;
}

export function WithTypesRequest() {
    return <GalleryContainer types={['image', 'video']} />;
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
