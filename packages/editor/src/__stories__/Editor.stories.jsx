import React, { useState } from 'react';
import Editor from '../components/EditorContainer';
import { ApiProvider } from '../../../data/src/contexts/ApiContext';
import withGoogleMaps from '../../../../.storybook/decorators/withGoogleMaps';
import faceAFace from '../../../../.storybook/data/stories/faceAFace';

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

const defaultStory = faceAFace;

const apiBaseUrl = `${window.location.protocol}//${window.location.host}/api`;

const EditorContainer = () => {
    const [story, setStory] = useState(defaultStory);
    return (
        <ApiProvider baseUrl={apiBaseUrl}>
            <Editor story={story} fullscreen onChange={setStory} memoryRouter />
        </ApiProvider>
    );
};

export const normal = () => <EditorContainer />;
