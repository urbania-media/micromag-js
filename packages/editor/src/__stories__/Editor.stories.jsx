import { PropTypes as MicromagPropTypes } from '@micromag/core';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import allScreensStory from '../../../../.storybook/data/stories/allScreens';
import faceAFaceStory from '../../../../.storybook/data/stories/faceAFace';
import { defaultTheme } from '../../../../.storybook/data/themes/micromag-default';
import { theme as backgroundTheme } from '../../../../.storybook/data/themes/with-background';
import withGoogleMaps from '../../../../.storybook/decorators/withGoogleMaps';
import withUppy from '../../../../.storybook/decorators/withUppy';
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

function EditorContainer({ defaultValue, isTheme, viewerTheme }) {
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
            />
        </ApiProvider>
    );
}

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

export function Empty() {
    return <EditorContainer defaultValue={{ title: 'Empty' }} />;
}
export function IsTheme() {
    return <EditorContainer defaultValue={defaultTheme} isTheme />;
}
export function AllScreens() {
    return <EditorContainer defaultValue={allScreensStory} />;
}
export function FaceAFace() {
    return <EditorContainer defaultValue={faceAFaceStory} />;
}
export function WithTheme() {
    return (
        <EditorContainer
            defaultValue={{
                title: 'With theme',
                theme: defaultTheme,
            }}
        />
    );
}
export function IsBackgroundTheme() {
    return <EditorContainer isTheme defaultValue={backgroundTheme} />;
}
export function WithBackgroundTheme() {
    return (
        <EditorContainer
            defaultValue={{
                title: 'With background theme',
                theme: backgroundTheme,
            }}
        />
    );
}
export function WithThemeAllScreens() {
    return (
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
}

export function WithViewerTheme() {
    return (
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
}

export function WithSomeScreens() {
    return (
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
}

export function WithConversation() {
    return (
        <EditorContainer
            defaultValue={{
                title: 'With conversation',
                components: [{ id: '1', type: 'conversation' }],
            }}
        />
    );
}
