import { useCallback } from 'react';
import { useApi } from '../contexts/ApiContext';

import useItems from './useItems';

const useRecentSearches = (count = 5, opts) => {
    const api = useApi();
    // TODO: implement this
    // api.search.getRecents(count)
    const getItems = useCallback(() => new Promise(() => []), [api, count]);
    const { items, ...request } = useItems({
        getItems,
        ...opts,
    });
    return {
        recent: [
            { id: 1, label: 'Bocarnea', value: 'bocarnea' },
            { id: 2, label: 'Crasula', value: 'crasula' },
            { id: 2, label: 'Plante', value: 'plante' },
        ],
        ...request,
    };
};

export default useRecentSearches;
