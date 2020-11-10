import { useCallback, useState } from 'react';

import { useApi } from '../contexts/ApiContext';

const useOrganisationBillingMethod = (organisationId) => {
    const [updating, setUpdating] = useState(false);
    const api = useApi();
    const update = useCallback(
        (data) => {
            // TODO: manage api calls for this
            // console.log(data);
            setUpdating(true);
            return new Promise().then(() => {
                setUpdating(false);
                return data;
            });
        },
        [api, organisationId, setUpdating],
    );
    return { update, updating };
};

export default useOrganisationBillingMethod;
