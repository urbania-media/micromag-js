import React from 'react';
import { IntlProvider } from 'react-intl';
import { MemoryRouter } from 'react-router';
import Editor from '../components/Editor';
import createDefaultStory from '../utils/createDefaultStory';

export default {
    component: Editor,
    title: 'Editor/Editor',
};

const story = createDefaultStory();

export const normal = () => (
    <IntlProvider locale="fr">
        <MemoryRouter>
            <Editor value={story} />
        </MemoryRouter>
    </IntlProvider>
);
