import { useCallback } from 'react';
import { useApi } from '../contexts/ApiContext';

import useItems from './useItems';

const useOrganisations = (query = null, opts) => {
    const api = useApi();
    const getItems = useCallback(() => api.organisations.get(query), [api, query]);
    const { items, ...request } = useItems({
        getItems,
        ...opts,
    });
    return {
        organisations: items,
        ...request,
    };
};

export default useOrganisations;
