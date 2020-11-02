import { useCallback, useState } from 'react';

import { useApi } from '../contexts/ApiContext';

const useOrganisationUpdate = (organisationId) => {
    const [updating, setUpdating] = useState(false);
    const api = useApi();
    const update = useCallback(
        (organisation) => {
            setUpdating(true);
            return api.organisations.update(organisationId, organisation).then((response) => {
                setUpdating(false);
                return response;
            });
        },
        [api, organisationId, setUpdating],
    );
    return { update, updating };
};

export default useOrganisationUpdate;
