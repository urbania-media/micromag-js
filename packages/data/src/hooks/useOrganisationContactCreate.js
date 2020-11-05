import { useCallback, useState } from 'react';

import { useApi } from '../contexts/ApiContext';

const useOrganisationContactCreate = (organisationId) => {
    const [creating, setCreating] = useState(false);
    const api = useApi();
    const create = useCallback(
        (data) => {
            setCreating(true);
            return api.organisations.contacts.create(organisationId, data).then((response) => {
                setCreating(false);
                return response;
            });
        },
        [api, organisationId, setCreating],
    );
    return { create, creating };
};

export default useOrganisationContactCreate;
