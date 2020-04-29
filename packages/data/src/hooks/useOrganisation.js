import { useCallback } from 'react';
import { useApi } from '../contexts/ApiContext';

import useData from './useData';

const useOrganisation = (id, opts) => {
    const api = useApi();
    const loader = useCallback(
        () =>
            id.match(/^[0-9]+$/) ? api.organisations.find(id) : api.organisations.findBySlug(id),
        [api, id],
    );
    const { data, ...request } = useData(loader, opts);
    return {
        organisation: data,
        ...request,
    };
};

export default useOrganisation;
