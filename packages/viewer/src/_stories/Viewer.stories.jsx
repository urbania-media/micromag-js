/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { IntlProvider } from 'react-intl';
import { MemoryRouter } from 'react-router';
import { withKnobs } from '@storybook/addon-knobs'; // eslint-disable-line import/no-extraneous-dependencies
import { withScreenSize } from '../../../../.storybook/decorators';
import { Basic } from '../../../../.storybook/screens';
import ScreensProvider from '../../../screens/src/ScreensProvider';

// import { paragraph, image } from '../../../../.storybook/data';

import Viewer from '../components/Viewer';

const props = {
    value: {
        components: Basic,
    },
};

export default {
    component: Viewer,
    title: 'Viewer/Viewer',
    decorators: [withKnobs, withScreenSize()],
};

export const Default = () => <Viewer screen="1" {...props} />;

export const withRouter = () => (
    <IntlProvider locale="fr">
        <MemoryRouter>
            <ScreensProvider>
                <Viewer screen="1" {...props} />
            </ScreensProvider>
        </MemoryRouter>
    </IntlProvider>
);
