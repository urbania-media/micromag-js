/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { ApiProvider } from './contexts/ApiContext';
import Api from './lib/Api';

interface DataProviderProps {
    api?: Api;
    apiBaseUrl?: string;
    children?: React.ReactNode;
}

const DataProvider = ({ api = null, apiBaseUrl = undefined, children = null }) => (
    <ApiProvider api={api} baseUrl={apiBaseUrl}>
        {children}
    </ApiProvider>
);

export default DataProvider;
