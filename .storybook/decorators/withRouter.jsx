import React from 'react';
import isObject from 'lodash/isObject';
import { MemoryRouter } from 'react-router';

import { RoutesProvider } from '../../packages/core/src/contexts';

const withIntlProvider = (Story, { parameters: { router = null } }) => {
    const enabled = isObject(router) || router === true;
    const { ...opts } = isObject(router) ? router : {};

    return enabled ? (
        <RoutesProvider>
            <MemoryRouter>
                <Story />
            </MemoryRouter>
        </RoutesProvider>
    ) : (
        <Story />
    );
};

export default withIntlProvider;
