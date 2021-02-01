import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import Editor from '../components/EditorContainer';
import { ApiProvider } from '../../../data/src/contexts/ApiContext';
import withGoogleMaps from '../../../../.storybook/decorators/withGoogleMaps';
import withUppy from '../../../../.storybook/decorators/withUppy';

import allScreensStory from '../../../../.storybook/data/stories/allScreens';
import faceAFaceStory from '../../../../.storybook/data/stories/faceAFace';
import { defaultTheme } from '../../../../.storybook/data/themes/micromag-default';

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
    primaryColor: {
        color: '#2ebb2c',
        alpha: 1,
    },
    secondaryColor: {
        color: '#f5a623',
        alpha: 1,
    },
    backgroundColor: {
        color: '#4a90e2',
        alpha: 1,
    },
    textStyle: {
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
};

EditorContainer.propTypes = {
    defaultValue: PropTypes.shape({
        title: PropTypes.string,
        components: MicromagPropTypes.components,
    }).isRequired,
    isTheme: PropTypes.bool,
    viewerTheme: MicromagPropTypes.branding,
};
EditorContainer.defaultProps = {
    isTheme: false,
    viewerTheme: null,
};

export const Empty = () => <EditorContainer />;
export const IsTheme = () => <EditorContainer defaultValue={defaultTheme} isTheme />;
export const AllScreens = () => <EditorContainer defaultValue={allScreensStory} />;
export const FaceAFace = () => <EditorContainer defaultValue={faceAFaceStory} />;
export const WithTheme = () => (
    <EditorContainer
        defaultValue={{
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
            theme: defaultTheme,
            components: allScreensStory.components.map((c) => ({
                ...c,
            })),
        }}
    />
);
