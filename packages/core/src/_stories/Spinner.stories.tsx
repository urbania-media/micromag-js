/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import Spinner from '../components/partials/Spinner';

export default {
    component: Spinner,
    title: 'Core/Spinner',
    parameters: {
        intl: true,
    },
};

export const Default = () => <Spinner />;
