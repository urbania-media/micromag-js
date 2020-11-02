import { useCallback } from 'react';
import { useApi } from '../contexts/ApiContext';

import useData from './useData';

const useOrganisationContact = (id, type, opts) => {
    const api = useApi();
    const loader = useCallback(() => api.organisations.contacts.findByType(id, type), [api, id]);
    const { data, ...request } = useData(loader, opts);
    return {
        contact: data,
        ...request,
    };
};

export default useOrganisationContact;
