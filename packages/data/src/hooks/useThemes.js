import { useCallback } from 'react';
import { useApi } from '../contexts/ApiContext';

import useData from './useData';

const useThemes = (useId = null, query = null, opts) => {
    const api = useApi();
    // TODO: plug this
    const loader = useCallback(() => api.organisations.themes.get(useId, query), [
        api,
        useId,
        query,
    ]);
    const { data, ...request } = useData(loader, opts);
    return {
        realThemes: data,
        // TODO: plug the backend
        themes: [
            {
                id: 1,
                title: "A user's theme",
                styles: {},
                components: [{ type: 'Ad' }, { type: 'Text' }],
            },
            {
                id: 2,
                title: 'Other theme',
                styles: {},
                components: [{ type: 'Ad' }],
            },
        ],
        ...request,
    };
};

export default useThemes;
