/* eslint-disable react/jsx-props-no-spreading */
import preview from '#.storybook/preview';
import React from 'react';

import Spinner from '../components/partials/Spinner';

const meta = preview.meta({
    component: Spinner,
    title: 'Core/Spinner',

    parameters: {
        intl: true,
    },
});

export const Default = meta.story(() => <Spinner />);
