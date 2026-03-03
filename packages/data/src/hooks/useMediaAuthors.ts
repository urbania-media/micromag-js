// import { useCallback } from 'react';
import { useApi } from '../contexts/ApiContext';

// import useItems from './useItems';

// eslint-disable-next-line
const useMediaAuthors = (query = null, count = 5, opts) => {
    const api = useApi(); // eslint-disable-line
    // console.log('api', api); // eslint-disable-line
    // const getItems = useCallback(() => api.medias.getAuthors(query, count), [api, query, count]);
    // const { items, pageItems, ...request } = useItems({
    //     getItems,
    //     ...opts,
    // });
    return {
        authors: [],
        // ...request,
    };
};

export default useMediaAuthors;
