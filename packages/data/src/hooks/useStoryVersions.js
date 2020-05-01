import { useCallback } from 'react';
import { useApi } from '../contexts/ApiContext';

import useItems from './useItems';

const useStoryVersions = (storyId, query = null, page = null, count = null, opts = {}) => {
    const api = useApi();
    const getItems = useCallback(
        (requestedPage = null) => api.stories.versions.get(storyId, query, requestedPage, count),
        [api, storyId, query, count],
    );
    const { items, pageItems, ...request } = useItems({
        getPage: page !== null ? getItems : null,
        getItems: page === null ? getItems : null,
        page,
        ...opts,
    });
    return {
        versions: page !== null ? pageItems : items,
        allVersions: items,
        ...request,
    };
};

export default useStoryVersions;
