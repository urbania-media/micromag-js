import { useMemoryRouter } from '@folklore/routes';
import isObject from 'lodash/isObject';
import React from 'react';
import { Router } from 'wouter';

import { RoutesProvider } from '../../packages/core/src/contexts';

const withIntlProvider = (Story, { parameters: { router = null } }) => {
    const enabled = isObject(router) || router === true;
    const { ...opts } = isObject(router) ? router : {};

    const { hook, searchHook } = useMemoryRouter();

    return enabled ? (
        <RoutesProvider>
            <Router hook={hook} searchHook={searchHook}>
                <Story />
            </Router>
        </RoutesProvider>
    ) : (
        <Story />
    );
};

export default withIntlProvider;
