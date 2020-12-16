import { useCallback } from 'react';
import { useApi } from '../contexts/ApiContext';

import useItems from './useItems';

const useMediasRecentSearches = (count = 5, opts) => {
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
            { id: 1, label: 'Bocarnea 546', value: 'bocarnea 546' },
            { id: 2, label: 'Crasula 782', value: 'crasula 782' },
            { id: 3, label: 'Plante', value: 'plante' },
            { id: 4, label: 'Plante1', value: 'plante1' },
            { id: 5, label: 'Plante2', value: 'plante2' },
            { id: 6, label: 'Plante3', value: 'plante3' },
            { id: 7, label: 'Plante4', value: 'plante4' },
            { id: 8, label: 'Plante5', value: 'plante5' },
            { id: 9, label: 'Plante6', value: 'plante6' },
            { id: 10, label: 'Plante7', value: 'plante7' },
            { id: 10, label: 'avatar', value: 'avatar' },
        ],
        ...request,
    };
};

export default useMediasRecentSearches;
