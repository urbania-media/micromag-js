import { useCallback, useState } from 'react';

import { useApi } from '../contexts/ApiContext';

const useOrganisationUpdate = organiationId => {
    const [updating, setUpdating] = useState(false);
    const api = useApi();
    const update = useCallback(
        organiation => {
            setUpdating(true);
            return api.organisations.update(organiationId, organiation).then(response => {
                setUpdating(false);
                return response;
            });
        },
        [api, organiationId, setUpdating],
    );
    return { update, updating };
};

export default useOrganisationUpdate;
