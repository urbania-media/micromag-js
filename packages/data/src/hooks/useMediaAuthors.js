import { useCallback } from 'react';
import { useApi } from '../contexts/ApiContext';
import useItems from './useItems';

const useMediaAuthors = (query = null, count = 5, opts) => {
    const api = useApi();
    const getItems = useCallback(() => api.medias.getAuthors(query, count), [api, query, count]);
    const { items, pageItems, ...request } = useItems({
        getItems,
        ...opts,
    });
    return {
        authors: items,
        ...request,
    };
};

export default useMediaAuthors;
