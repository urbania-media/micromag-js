/* eslint-disable react/jsx-props-no-spreading */
import sound from '#.storybook/data/files/test.mp3';
import video from '#.storybook/data/files/test.mp4';
import withUppy from '#.storybook/decorators/withUppy';
import preview from '#.storybook/preview';
import React, { useState } from 'react';

import ActionsProvider from '@panneau/actions';
import { ModalProvider } from '@panneau/core/contexts';
// import MicromagFieldsProvider from '../../../fields/src/FieldsProvider';
import { QueryProvider } from '@panneau/data';
import DisplaysProvider from '@panneau/displays';
import FieldsProvider from '@panneau/fields';
import FiltersProvider from '@panneau/filters';
import ModalsProvider from '@panneau/modals';

import { Modals } from '@micromag/core/components';

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

const meta = preview.meta({
    component: MediaGallery,
    title: 'Editor/MediaGallery',
    decorators: [withUppy],

    parameters: {
        screenSize: true,
        intl: true,
    },
});

// eslint-disable-next-line react/prop-types
const GalleryContainer = ({ value: defaultValue = null, ...containerProps }) => {
    const [value, setValue] = useState(defaultValue);
    return (
        <div style={{ padding: 20 }}>
            <ApiProvider baseUrl={apiBaseUrl}>
                <QueryProvider>
                    <FieldsProvider>
                        <ModalsProvider>
                            <ModalProvider>
                                <DisplaysProvider>
                                    <FiltersProvider>
                                        <ActionsProvider>
                                            <MediaGallery
                                                {...containerProps}
                                                value={value}
                                                onChange={setValue}
                                            />
                                        </ActionsProvider>
                                    </FiltersProvider>
                                </DisplaysProvider>
                                {/* The confirmations of the actions (ex.: delete) */}
                                <Modals />
                            </ModalProvider>
                        </ModalsProvider>
                    </FieldsProvider>
                </QueryProvider>
            </ApiProvider>
        </div>
    );
};

export const Normal = meta.story(() => {
    return <GalleryContainer />;
});

export const WithTypesRequest = meta.story(() => {
    return <GalleryContainer types={['image', 'video']} />;
});

export const WithTestMedia = meta.story(() => {
    return <GalleryContainer {...props} type="image" />;
});

export const WithSelectedMedia = meta.story(() => {
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
});

// A `media://` reference that the story's medias don't resolve (ex.: in a copied screen)
export const PickerWithUnresolvedReference = meta.story(() => {
    return <GalleryContainer {...props} type="image" isPicker value="media://999" />;
});

export const WithList = meta.story(() => {
    return <GalleryContainer medias={list} />;
});

// The medias API in memory: deleting a media from the table (trash button and its confirmation)
// removes it from the list
const createMemoryMediasApi = () => {
    let items = props.medias;
    const getPage = () =>
        Promise.resolve({
            data: items,
            meta: { current_page: 1, last_page: 1, total: items.length },
        });
    return {
        get: getPage,
        getTrashed: () =>
            Promise.resolve({ data: [], meta: { current_page: 1, last_page: 1, total: 0 } }),
        find: (id) => Promise.resolve(items.find((it) => it.id === id) ?? null),
        create: (data) => Promise.resolve(data),
        update: (id, data) => Promise.resolve({ ...items.find((it) => it.id === id), ...data }),
        destroy: (id) => {
            items = items.filter((it) => it.id !== id);
            return Promise.resolve({ success: true });
        },
    };
};

export const WithDeletableMedias = meta.story(() => {
    const [api] = useState(createMemoryMediasApi);
    return <GalleryContainer api={api} />;
});

export const WithFontType = meta.story(() => {
    return <GalleryContainer types="font" />;
});

export const WithVideoType = meta.story(() => {
    return <GalleryContainer types="video" />;
});
