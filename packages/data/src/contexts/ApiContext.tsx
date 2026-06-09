import { ReactNode, createContext, use } from 'react';

import Api from '../lib/Api';

const ApiContext = createContext(null);

export const useApi = () => use(ApiContext);

interface ApiProviderProps {
    api?: Api;
    baseUrl?: string;
    children: ReactNode;
}

export function ApiProvider({
    api: initialApi = null,
    baseUrl = undefined,
    children,
}: ApiProviderProps) {
    const previousApi = useApi();
    return (
        <ApiContext
            value={
                initialApi ||
                previousApi ||
                new Api({
                    baseUrl,
                })
            }
        >
            {children}
        </ApiContext>
    );
}

export default ApiContext;
