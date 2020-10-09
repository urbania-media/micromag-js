/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { IntlProvider } from 'react-intl'; // eslint-disable-line
import { MemoryRouter } from 'react-router'; // eslint-disable-line
import { basic, medium } from '../../../../.storybook/data/screens';

import Viewer from '../components/ViewerContainer';

const props = {
    screenId: basic[0].id,
    story: {
        components: basic,
    },
};

const mediumProps = {
    screenId: medium[0].id,
    story: {
        components: medium,
    },
};

export default {
    component: Viewer,
    title: 'Viewer/Viewer',
    parameters: {
        screenSize: true,
        intl: true,
    },
};

export const Default = () => <Viewer {...props} />;

export const Swipe = () => <Viewer {...props} interactions={['swipe']} />;

export const Tap = () => <Viewer {...props} interactions={['tap']} />;

export const Both = () => <Viewer {...props} interactions={['swipe', 'tap']} />;

export const SwipeMedium = () => <Viewer {...mediumProps} interactions={['swipe']} />;
