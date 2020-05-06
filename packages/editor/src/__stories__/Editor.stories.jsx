import React, { useState } from 'react';
import Editor from '../components/EditorContainer';
import IntlProvider from '../../../intl/src/IntlProvider';
import { ApiProvider } from '../../../data/src/contexts/ApiContext';
import { withGoogleMapsApi } from '../../../../.storybook/decorators';

// import manager from '../../../intl/src/manager';

import createDefaultStory from '../utils/createDefaultStory';
import '../../../intl/locale/fr';

export default {
    component: Editor,
    title: 'Editor/Editor',
    decorators: [withGoogleMapsApi],
};

const defaultStory = createDefaultStory();

const apiBaseUrl = `${window.location.protocol}//${window.location.host}/api`;

const EditorContainer = () => {
    const [story, setStory] = useState(defaultStory);
    return (
        <IntlProvider locale="fr">
            <ApiProvider baseUrl={apiBaseUrl}>
                <Editor story={story} fullscreen onChange={setStory} memoryRouter />
            </ApiProvider>
        </IntlProvider>
    );
};

export const normal = () => <EditorContainer />;
