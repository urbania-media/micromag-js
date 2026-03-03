/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext, useMemo } from 'react';

import Api from '../lib/Api';

const ApiContext = React.createContext(null);

export const useApi = () => useContext(ApiContext);

interface ApiProviderProps {
    api?: Api;
    baseUrl?: string;
    children: React.ReactNode;
}

export function ApiProvider({ api: initialApi = null, baseUrl = undefined, children }) {
    const previousApi = useApi();
    const api = useMemo(
        () =>
            initialApi ||
            previousApi ||
            new Api({
                baseUrl,
                // baseUrl: 'https://micromag.studio.test/api',
            }),
        [previousApi, initialApi, baseUrl],
    );
    return <ApiContext.Provider value={api}>{children}</ApiContext.Provider>;
}

export default ApiContext;
