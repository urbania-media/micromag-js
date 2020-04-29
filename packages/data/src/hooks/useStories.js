import { useCallback } from 'react';
import { useApi } from '../contexts/ApiContext';

import useItems from './useItems';

const useStories = (query = null, page = null, count = null, opts) => {
    const api = useApi();
    const getItems = useCallback(
        (requestedPage = null) => api.stories.get(query, requestedPage, count),
        [api, query, count],
    );
    const { items, pageItems, ...request } = useItems({
        getPage: page !== null ? getItems : null,
        getItems: page === null ? getItems : null,
        page,
        ...opts,
    });
    return {
        stories: page !== null ? pageItems : items,
        allStories: items,
        ...request,
    };
};

export default useStories;
