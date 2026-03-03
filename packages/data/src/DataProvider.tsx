/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { ApiProvider } from './contexts/ApiContext';
import Api from './lib/Api';

interface DataProviderProps {
    api?: Api;
    apiBaseUrl?: string;
    children?: React.ReactNode;
}

function DataProvider({ api = null, apiBaseUrl = undefined, children = null }) {
    return (
        <ApiProvider api={api} baseUrl={apiBaseUrl}>
            {children}
        </ApiProvider>
    );
}

export default DataProvider;
