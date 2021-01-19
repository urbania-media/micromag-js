import { useCallback } from 'react';
import { useApi } from '../contexts/ApiContext';

import useItems from './useItems';

const useMediaTags = (query = null, page = null, count = 5, opts) => {
    const api = useApi();
    const getItems = useCallback(
        (requestedPage = null) => api.medias.getTags(query, requestedPage, count),
        [api, query, count],
    );
    const { items, pageItems, ...request } = useItems({
        getPage: page !== null ? getItems : null,
        getItems: page === null ? getItems : null,
        page,
        ...opts,
    });
    // console.log('medias', items);
    return {
        tags: page !== null ? pageItems : items,
        allTags: items,
        ...request,
    };
};

export default useMediaTags;
