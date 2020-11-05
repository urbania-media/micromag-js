import { useCallback, useState } from 'react';

import { useApi } from '../contexts/ApiContext';

const useOrganisationMemberBatch = (organisationId) => {
    const [batching, setBatching] = useState(false);
    const api = useApi();
    const batch = useCallback(
        (data) => {
            setBatching(true);
            return api.organisations.team.batch(organisationId, data).then((response) => {
                setBatching(false);
                return response;
            });
        },
        [api, organisationId, setBatching],
    );
    return { batch, batching };
};

export default useOrganisationMemberBatch;
