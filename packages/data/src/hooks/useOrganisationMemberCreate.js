import { useCallback, useState } from 'react';

import { useApi } from '../contexts/ApiContext';

const useOrganisationMemberCreate = (organisationId) => {
    const [creating, setCreating] = useState(false);
    const api = useApi();
    const create = useCallback(
        (data) => {
            setCreating(true);
            return api.organisations.team.create(organisationId, data).then((response) => {
                setCreating(false);
                return response;
            });
        },
        [api, setCreating],
    );
    return { create, creating };
};

export default useOrganisationMemberCreate;
