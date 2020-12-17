import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import Editor from '../components/EditorContainer';
import { ApiProvider } from '../../../data/src/contexts/ApiContext';
import withGoogleMaps from '../../../../.storybook/decorators/withGoogleMaps';

import allScreensStory from '../../../../.storybook/data/stories/allScreens';
import faceAFaceStory from '../../../../.storybook/data/stories/faceAFace';

// import manager from '../../../intl/src/manager';

// import createDefaultStory from '../utils/createDefaultStory';

export default {
    component: Editor,
    title: 'Editor/Editor',
    decorators: [withGoogleMaps],
    parameters: {
        intl: true,
    },
};

const apiBaseUrl = `${window.location.protocol}//${window.location.host}/api`;

const EditorContainer = ({ defaultStory }) => {
    const [story, setStory] = useState(defaultStory);
    return (
        <ApiProvider baseUrl={apiBaseUrl}>
            <Editor story={story} fullscreen onChange={setStory} memoryRouter />
        </ApiProvider>
    );
};

EditorContainer.propTypes = {
    defaultStory: PropTypes.shape({
        title: PropTypes.string,
        components: MicromagPropTypes.components,
    }).isRequired,
}

export const Empty = () => <EditorContainer />;
export const AllScreens = () => <EditorContainer defaultStory={allScreensStory} />;
export const FaceAFace = () => <EditorContainer defaultStory={faceAFaceStory} />;
