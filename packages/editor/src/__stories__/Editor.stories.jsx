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

const EditorContainer = ({ defaultValue, isTheme }) => {
    const [value, setValue] = useState(defaultValue);
    return (
        <ApiProvider baseUrl={apiBaseUrl}>
            <Editor value={value} isTheme={isTheme} fullscreen onChange={setValue} memoryRouter />
        </ApiProvider>
    );
};

EditorContainer.propTypes = {
    defaultValue: PropTypes.shape({
        title: PropTypes.string,
        components: MicromagPropTypes.components,
    }).isRequired,
    isTheme: PropTypes.bool,
};
EditorContainer.defaultProps = {
    isTheme: false,
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
