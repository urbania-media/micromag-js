/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { IntlProvider } from 'react-intl'; // eslint-disable-line
import { MemoryRouter } from 'react-router'; // eslint-disable-line
import { withKnobs } from '@storybook/addon-knobs'; // eslint-disable-line import/no-extraneous-dependencies
import { withScreenSize } from '../../../../.storybook/decorators';
import { Basic, Medium } from '../../../../.storybook/screens/index';

// import { paragraph, image } from '../../../../.storybook/data';

import Viewer from '../components/ViewerContainer';

const props = {
    screenId: Basic[0].id,
    story: {
        components: Basic,
    },
};

const mediumProps = {
    screenId: Medium[0].id,
    story: {
        components: Medium,
    },
};

export default {
    component: Viewer,
    title: 'Viewer/Viewer',
    decorators: [withKnobs, withScreenSize()],
};

// eslint-disable-next-line react/prop-types
const Container = ({ children }) => (
    <IntlProvider locale="fr">
        {children}
    </IntlProvider>
);

export const Default = () => (
    <Container>
        <Viewer {...props} />
    </Container>
);

export const Swipe = () => (
    <Container>
        <Viewer {...props} interactions={['swipe']} />
    </Container>
);

export const Tap = () => (
    <Container>
        <Viewer {...props} interactions={['tap']} />
    </Container>
);

export const Both = () => (
    <Container>
        <Viewer {...props} interactions={['swipe', 'tap']} />
    </Container>
);

export const SwipeMedium = () => (
    <Container>
        <Viewer {...mediumProps} interactions={['swipe']} />
    </Container>
);
