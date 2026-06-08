import isObject from 'lodash-es/isObject';
import React from 'react';
import { Router } from 'wouter';
import { memoryLocation } from 'wouter/memory-location';

import { RoutesProvider } from '../../packages/core/src/contexts';

const withIntlProvider = (Story, { parameters: { router = null } }) => {
    const enabled = isObject(router) || router === true;
    const { ...opts } = isObject(router) ? router : {};

    const { hook, searchHook } = memoryLocation();

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
