import { useCallback } from 'react';

import { useApi } from '../contexts/ApiContext';
// import useItems from './useItems';
import useItemsPaginated from './useItemsPaginated';

const useMedias = (query = null, page = 1, count = 10, opts = null) => {
    const api = useApi();

    const getPage = useCallback(
        (newQuery, requestedPage = null, requestedCount = null) =>
            api.medias.get(newQuery, requestedPage, requestedCount),
        [api],
    );

    return useItemsPaginated({
        getPage,
        query,
        page,
        count,
        ...opts,
    });
};

export default useMedias;
