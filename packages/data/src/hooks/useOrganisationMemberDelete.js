import { useCallback, useState } from 'react';

import { useApi } from '../contexts/ApiContext';

const useOrganisationMemberDelete = (organisationId) => {
    const [deleting, setDeleting] = useState(false);
    const api = useApi();
    const deleteMember = useCallback(
        (memberId) => {
            setDeleting(true);
            return api.organisations.team.delete(organisationId, memberId).then((response) => {
                setDeleting(false);
                return response;
            });
        },
        [api, organisationId, setDeleting],
    );
    return { deleteMember, deleting };
};

export default useOrganisationMemberDelete;
