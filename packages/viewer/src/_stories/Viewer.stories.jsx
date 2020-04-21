/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { IntlProvider } from 'react-intl'; // eslint-disable-line
import { MemoryRouter } from 'react-router'; // eslint-disable-line
import { withKnobs } from '@storybook/addon-knobs'; // eslint-disable-line import/no-extraneous-dependencies
import { withScreenSize } from '../../../../.storybook/decorators';
import { Basic, Medium } from '../../../../.storybook/screens/index';
import ViewerRouter from '../../../../.storybook/components/ViewerRouter';
import ScreensProvider from '../../../screens/src/ScreensProvider';

// import { paragraph, image } from '../../../../.storybook/data';

import Viewer from '../components/Viewer';

const props = {
    screen: Basic[0].id,
    value: {
        components: Basic,
    },
};

const mediumProps = {
    screen: Medium[0].id,
    value: {
        components: Medium,
    },
};

export default {
    component: Viewer,
    title: 'Viewer/Viewer',
    decorators: [withKnobs, withScreenSize()],
};

// eslint-disable-next-line react/prop-types
const Frame = ({ children }) => (
    <IntlProvider locale="fr">
        <MemoryRouter>
            <ScreensProvider>
                <ViewerRouter>{children}</ViewerRouter>
            </ScreensProvider>
        </MemoryRouter>
    </IntlProvider>
);

export const Default = () => (
    <Frame>
        {({ screenId, onScreenChange }) => (
            <Viewer {...props} screen={screenId} onScreenChange={onScreenChange} />
        )}
    </Frame>
);

export const Swipe = () => (
    <Frame>
        {({ screenId, onScreenChange }) => (
            <Viewer
                {...props}
                screen={screenId}
                onScreenChange={onScreenChange}
                interactions={['swipe']}
            />
        )}
    </Frame>
);

export const Tap = () => (
    <Frame>
        {({ screenId, onScreenChange }) => (
            <Viewer
                {...props}
                screen={screenId}
                onScreenChange={onScreenChange}
                interactions={['tap']}
            />
        )}
    </Frame>
);

export const Both = () => (
    <Frame>
        {({ screenId, onScreenChange }) => (
            <Viewer
                {...props}
                screen={screenId}
                onScreenChange={onScreenChange}
                interactions={['swipe', 'tap']}
            />
        )}
    </Frame>
);

export const SwipeMedium = () => (
    <Frame>
        {({ screenId, onScreenChange }) => (
            <Viewer
                {...mediumProps}
                screen={screenId}
                onScreenChange={onScreenChange}
                interactions={['swipe']}
            />
        )}
    </Frame>
);
