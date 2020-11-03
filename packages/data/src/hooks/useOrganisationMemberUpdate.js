import { useCallback, useState } from 'react';

import { useApi } from '../contexts/ApiContext';

const useOrganisationMemberUpdate = (organisationId) => {
    const [updating, setUpdating] = useState(false);
    const api = useApi();
    const update = useCallback(
        (memberId, data) => {
            setUpdating(true);
            return api.organisations.team
                .update(organisationId, memberId, data)
                .then((response) => {
                    setUpdating(false);
                    return response;
                });
        },
        [api, organisationId, setUpdating],
    );
    return { update, updating };
};

export default useOrganisationMemberUpdate;
