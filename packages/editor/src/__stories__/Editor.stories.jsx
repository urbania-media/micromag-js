import React, { useState } from 'react';
import Editor from '../components/Container';
import IntlProvider from '../../../intl/src/IntlProvider';

// import manager from '../../../intl/src/manager';

import createDefaultStory from '../utils/createDefaultStory';
import '../../../intl/locale/fr';

export default {
    component: Editor,
    title: 'Editor/Editor',
};

const defaultStory = createDefaultStory();

const EditorContainer = () => {
    const [story, setStory] = useState(defaultStory);
    return (
        <IntlProvider locale="fr">
            <Editor story={story} fullscreen onChange={setStory} memoryRouter />
        </IntlProvider>
    );
};

export const normal = () => <EditorContainer />;
