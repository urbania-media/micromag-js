import React from 'react';

import { MediasApiProvider as BaseMediasApiProvider, type MediasApi } from '@panneau/medias';

import Api from './lib/Api';

import { ApiProvider, useApi } from './contexts/ApiContext';

function MediasApiProvider({ children }) {
    const api = useApi();
    const mediasApi: MediasApi = api !== null ? (api.medias ?? null) : null;
    return <BaseMediasApiProvider api={mediasApi}>{children}</BaseMediasApiProvider>;
}

interface DataProviderProps {
    api?: Api;
    apiBaseUrl?: string;
    children?: React.ReactNode;
}

function DataProvider({ api = null, apiBaseUrl = undefined, children = null }: DataProviderProps) {
    return (
        <ApiProvider api={api} baseUrl={apiBaseUrl}>
            <MediasApiProvider>{children}</MediasApiProvider>
        </ApiProvider>
    );
}

export default DataProvider;
