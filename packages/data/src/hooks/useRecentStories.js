import { useCallback } from 'react';
import { useApi } from '../contexts/ApiContext';

import useItems from './useItems';

const useRecentStories = (count = 5, opts) => {
    const api = useApi();
    const getItems = useCallback(() => api.stories.getRecents(count), [api, count]);
    const { items, ...request } = useItems({
        getItems,
        ...opts,
    });
    return {
        stories: items,
        ...request,
    };
};

export default useRecentStories;
