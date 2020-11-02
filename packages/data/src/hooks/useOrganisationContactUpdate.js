import { useCallback, useState } from 'react';

import { useApi } from '../contexts/ApiContext';

const useOrganisationContactUpdate = (organisationId) => {
    const [updating, setUpdating] = useState(false);
    const api = useApi();
    const update = useCallback(
        (contactId, contact) => {
            setUpdating(true);
            return api.organisations.contacts
                .update(organisationId, contactId, contact)
                .then((response) => {
                    setUpdating(false);
                    return response;
                });
        },
        [api, organisationId, setUpdating],
    );
    return { update, updating };
};

export default useOrganisationContactUpdate;
