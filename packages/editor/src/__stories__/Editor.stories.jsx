import PropTypes from 'prop-types';
import React, { useState } from 'react';

import { PropTypes as MicromagPropTypes } from '@micromag/core';

import { callToAction, videoMedia } from '../../../../.storybook/data';
import allScreensStory from '../../../../.storybook/data/stories/allScreens';
import faceAFaceStory from '../../../../.storybook/data/stories/faceAFace';
import multipleArticles from '../../../../.storybook/data/stories/multipleArticles';
import videoAudio from '../../../../.storybook/data/stories/videoAudio';
import { defaultTheme } from '../../../../.storybook/data/themes/micromag-default';
import treeTheme from '../../../../.storybook/data/themes/tree';
import { theme as backgroundTheme } from '../../../../.storybook/data/themes/with-background';
import withGoogleMaps from '../../../../.storybook/decorators/withGoogleMaps';
import withUppy from '../../../../.storybook/decorators/withUppy';
import signs from '../../../../screens/urbania-horoscope/src/data/signs';
import team from '../../../../.storybook/data/team';
import { ApiProvider } from '../../../data/src/contexts/ApiContext';
import Editor from '../components/EditorContainer';

// import manager from '../../../intl/src/manager';
// import createDefaultStory from '../utils/createDefaultStory';

export default {
    component: Editor,
    title: 'Editor/Editor',
    decorators: [withGoogleMaps, withUppy],
    parameters: {
        intl: true,
    },
};

const hasWindow = typeof window !== 'undefined';

const apiBaseUrl = hasWindow ? `${window.location.protocol}//${window.location.host}/api` : '/api';

const EditorContainer = ({ defaultValue, isTheme, viewerTheme }) => {
    const [value, setValue] = useState(defaultValue);
    return (
        <ApiProvider baseUrl={apiBaseUrl}>
            <Editor
                value={value}
                isTheme={isTheme}
                fullscreen
                onChange={setValue}
                memoryRouter
                viewerTheme={viewerTheme}
                screenNamespaces={['urbania']}
            />
        </ApiProvider>
    );
};

const viewerTheme = {
    logo: {
        id: '26',
        type: 'image',
        name: 'avatar.png',
        url: 'https://cdn.dev.microm.ag/image/2021-02-01/34-104427.png',
        thumbnail_url: 'https://cdn.dev.microm.ag/image/2021-02-01/34-104427.png',
        metadata: {
            filename: 'avatar.png',
            size: 65870,
            mime: 'image/png',
            width: 200,
            height: 200,
        },
    },
    colors: {
        primary: {
            color: '#2ebb2c',
            alpha: 1,
        },
        secondary: {
            color: '#f5a623',
            alpha: 1,
        },
    },
    background: {
        color: {
            color: '#4a90e2',
            alpha: 1,
        },
    },
    textStyles: {
        title: {
            fontFamily: {
                type: 'google',
                name: 'Lato',
                variants: [
                    '100',
                    '100italic',
                    '300',
                    '300italic',
                    'regular',
                    'italic',
                    '700',
                    '700italic',
                    '900',
                    '900italic',
                ],
            },
            color: {
                color: '#9b9b9b',
                alpha: 1,
            },
        },
    },
};

EditorContainer.propTypes = {
    defaultValue: PropTypes.shape({
        title: PropTypes.string,
        components: MicromagPropTypes.screenComponents,
    }),
    isTheme: PropTypes.bool,
    viewerTheme: MicromagPropTypes.viewerTheme,
};
EditorContainer.defaultProps = {
    defaultValue: null,
    isTheme: false,
    viewerTheme: null,
};

export const Test = () => (
    <EditorContainer
        defaultValue={{
            title: 'Test',
            theme: defaultTheme,
            components: [
                {
                    id: '1cb8a4be-5c1a-11eb-985f-ad6fce99d848',
                    type: 'urbania-article',
                    url: 'https://urbania.ca/article/tous-les-dechets-sen-vont-a-la-meme-place-et-autres-mythes-sur-le-compostage',
                    title: {
                        body: null,
                        textStyle: {
                            // fontFamily: {
                            //     name: 'Garage Gothic',
                            //     fallback: 'Arial',
                            //     type: 'sans-serif',
                            // },
                            fontSize: 30,
                            fontStyle: {
                                bold: true,
                                // transform: 'uppercase',
                            },
                            // lineHeight: 0.2,
                            align: 'center',
                            color: '#ff4dff',
                        },
                    },
                    background: {
                        color: { color: '#00f', alpha: 1 },
                    },
                    callToAction: callToAction(),
                    description: {
                        body: '<p>HELLO MY NAME IS EARL I AM SOMETHING SOMETHING AND STUFF YOU KNOW THINGS</p>',
                    },
                },
            ],
        }}
    />
);

export const TestHoroscope = () => (
    <EditorContainer
        defaultValue={{
            title: 'Test',
            // theme: defaultTheme,
            components: [
                {
                    id: '1cb8a4be-5c1a-11eb-985f-ad6fce99d848',
                    type: 'urbania-horoscope',
                    signs,
                },
            ],
        }}
    />
);

export const TestReco = () => (
    <EditorContainer
        defaultValue={{
            title: 'Test',
            // theme: defaultTheme,
            components: [
                {
                    id: '1cb8a4be-5c1a-11eb-985f-ad6fce99d848',
                    type: 'urbania-recommendation',
                },
            ],
        }}
    />
);

export const Empty = () => <EditorContainer defaultValue={{ title: 'Empty' }} />;

export const VideoAudio = () => <EditorContainer defaultValue={videoAudio} />;

export const IsTree = () => <EditorContainer defaultValue={treeTheme} />;

export const Map = () => (
    <EditorContainer defaultValue={{ components: [{ id: 'map', type: 'map' }] }} />
);

export const Survey = () => (
    <EditorContainer defaultValue={{ components: [{ id: 'survey', type: 'survey' }] }} />
);

export const Quiz = () => (
    <EditorContainer defaultValue={{ components: [{ id: 'quiz', type: 'quiz' }] }} />
);

export const QuizMultiple = () => (
    <EditorContainer
        defaultValue={{ components: [{ id: 'quiz-multiple', type: 'quiz-multiple' }] }}
    />
);

export const VideoCustom = () => (
    <EditorContainer
        defaultValue={{ components: [{ id: 'video', type: 'video', video: videoMedia() }] }}
    />
);
export const IsTheme = () => <EditorContainer defaultValue={defaultTheme} isTheme />;
export const AllScreens = () => <EditorContainer defaultValue={allScreensStory} />;
export const FaceAFace = () => <EditorContainer defaultValue={faceAFaceStory} />;
export const MultipleArticles = () => <EditorContainer defaultValue={multipleArticles} />;

export const MultipleKeypads = () => (
    <EditorContainer
        defaultValue={{
            title: 'With theme (all screens)',
            theme: defaultTheme,
            components: [
                {
                    id: '12345',
                    type: 'keypad',
                    items: team,
                    verticalAlign: 'middle',
                    columnAlign: 'middle',
                    // rowAlign: 'top',
                    columns: 3,
                    spacing: 5,
                },
            ],
        }}
    />
);

export const WithTheme = () => (
    <EditorContainer
        defaultValue={{
            title: 'With theme',
            theme: defaultTheme,
        }}
    />
);
export const IsBackgroundTheme = () => <EditorContainer isTheme defaultValue={backgroundTheme} />;
export const WithBackgroundTheme = () => (
    <EditorContainer
        defaultValue={{
            title: 'With background theme',
            theme: backgroundTheme,
        }}
    />
);
export const WithThemeAllScreens = () => (
    <EditorContainer
        defaultValue={{
            title: 'With theme (all screens)',
            theme: defaultTheme,
            components: allScreensStory.components.map((c) => ({
                ...c,
            })),
        }}
    />
);

export const WithViewerTheme = () => (
    <EditorContainer
        viewerTheme={viewerTheme}
        defaultValue={{
            title: 'With viewer theme',
            theme: defaultTheme,
            components: allScreensStory.components.map((c) => ({
                ...c,
            })),
        }}
    />
);

export const WithSomeScreens = () => (
    <EditorContainer
        viewerTheme={viewerTheme}
        defaultValue={{
            title: 'With some screens',
            components: [
                { id: '1', type: 'audio' },
                { id: '2', type: 'contribution' },
                { id: '3', type: 'map-images', draggable: true },
            ],
        }}
    />
);

export const WithConversation = () => (
    <EditorContainer
        defaultValue={{
            title: 'With conversation',
            components: [{ id: '1', type: 'conversation' }],
        }}
    />
);
