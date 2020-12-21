import { useCallback, useState } from 'react';

import { useApi } from '../contexts/ApiContext';

import useData from './useData';

export const useContributions = ({ screenId, opts = {} } = {}) => {
    const api = useApi();

    const [defaultContributions] = useState(
        [...new Array(10)].map((el, i) => ({
            name: `Nom ${i + 1}`,
            message: `Message ${i + 1}`,
        })),
    );

    const loader = useCallback(() => (api !== null ? api.contributions.get(screenId) : null), [
        api,
        screenId,
    ]);
    const { data, ...request } = api !== null ? useData(loader, opts) : { data: null };

    return {
        contributions: data || defaultContributions,
        ...request,
    };
};

export default useContributions;
