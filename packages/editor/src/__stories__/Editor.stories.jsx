import React, { useState } from 'react';
import { MemoryRouter } from 'react-router';
import { repository, SchemasProvider } from '@micromag/schemas';
import Editor from '../components/Editor';
import IntlProvider from '../../../intl/src/IntlProvider';
// import manager from '../../../intl/src/manager';
import ScreensProvider from '../../../screens/src/ScreensProvider';
import createDefaultStory from '../utils/createDefaultStory';
import '../../../intl/locale/en';
import '../../../intl/locale/fr';

export default {
    component: Editor,
    title: 'Editor/Editor',
};

const defaultStory = createDefaultStory();

const EditorContainer = () => {
    const [value, setValue] = useState(defaultStory);
    return (
        <IntlProvider locale="fr">
            <MemoryRouter>
                <ScreensProvider>
                    <SchemasProvider repository={repository}>
                        <Editor value={value} fullscreen onChange={setValue} />
                    </SchemasProvider>
                </ScreensProvider>
            </MemoryRouter>
        </IntlProvider>
    );
};

export const normal = () => <EditorContainer />;
