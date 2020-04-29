import { useCallback } from 'react';
import { useApi } from '../contexts/ApiContext';

import useData from './useData';

const useOrganisationTeam = (organisationId = null, query = null, opts) => {
    const api = useApi();
    const loader = useCallback(() => api.organisations.team.get(organisationId, query), [
        api,
        organisationId,
        query,
    ]);
    const { data, ...request } = useData(loader, opts);
    return {
        team: data,
        ...request,
    };
};

export default useOrganisationTeam;
