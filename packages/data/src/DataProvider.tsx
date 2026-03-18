/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import Api from './lib/Api';

import { ApiProvider } from './contexts/ApiContext';

interface DataProviderProps {
    api?: Api;
    apiBaseUrl?: string;
    children?: React.ReactNode;
}

function DataProvider({ api = null, apiBaseUrl = undefined, children = null }: DataProviderProps) {
    return (
        <ApiProvider api={api} baseUrl={apiBaseUrl}>
            {children}
        </ApiProvider>
    );
}

export default DataProvider;
