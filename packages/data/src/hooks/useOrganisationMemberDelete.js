import { useCallback, useState } from 'react';

import { useApi } from '../contexts/ApiContext';

const useOrganisatioMemberDelete = (organisationId) => {
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
        [api, setDeleting],
    );
    return { deleteMember, deleting };
};

export default useOrganisatioMemberDelete;
