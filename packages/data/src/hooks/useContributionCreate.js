import { useCallback, useState } from 'react';

import { useApi } from '../contexts/ApiContext';

export const useContributionCreate = ({ screenId, onSuccess = null } = {}) => {
    const api = useApi();
    const [creating, setCreating] = useState(false);

    const create = useCallback(
        (data) => {
            setCreating(true);
            return api.contributions.create({ screen_id: screenId, ...data }).then((response) => {
                setCreating(false);
                if (onSuccess !== null) {
                    onSuccess(response);
                }
                return response;
            });
        },
        [api, setCreating, onSuccess, screenId],
    );
    return { create, creating };
};

export default useContributionCreate;
