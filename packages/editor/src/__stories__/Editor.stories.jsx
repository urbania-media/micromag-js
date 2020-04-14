import React from 'react';
import { IntlProvider } from 'react-intl';
import { MemoryRouter } from 'react-router';
import { repository, SchemasProvider } from '@micromag/schemas';
import Editor from '../components/Editor';
import ScreensProvider from '../../../screens/src/ScreensProvider';
import createDefaultStory from '../utils/createDefaultStory';

export default {
    component: Editor,
    title: 'Editor/Editor',
};

const story = createDefaultStory();

export const normal = () => (
    <IntlProvider locale="fr">
        <MemoryRouter>
            <ScreensProvider>
                <SchemasProvider repository={repository}>
                    <Editor value={story} fullscreen />
                </SchemasProvider>
            </ScreensProvider>
        </MemoryRouter>
    </IntlProvider>
);
