import { useCallback, useState } from 'react';

import { useApi } from '../contexts/ApiContext';

import useData from './useData';

export const useContributions = (screenId, opts) => {
    const api = useApi();

    const [defaultContributions] = useState(
        [...new Array(10)].map((el, i) => ({
            name: `Nom ${i + 1}`,
            message: `Message ${i + 1}`,
        })),
    );

    const loader = useCallback(() => api.contributions.get(screenId), [api, screenId]);
    const { data, ...request } = useData(loader, opts);
    return {
        contributions: data || defaultContributions,
        ...request,
    };
};

export const useCreateContribution = ({ screenId, onSuccess = null } = {}) => {
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
