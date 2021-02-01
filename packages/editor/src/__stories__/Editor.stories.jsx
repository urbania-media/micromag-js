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
    logo: null,
    primaryColor: {
        color: '#bb2c2c',
        alpha: 1,
    },
    secondaryColor: {
        color: '#9013fe',
        alpha: 1,
    },
    backgroundColor: {
        color: '#6e5252',
        alpha: 1,
    },
    textStyle: {
        fontFamily: 'Courier',
        fontSize: 20,
        color: {
            color: '#912525',
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
