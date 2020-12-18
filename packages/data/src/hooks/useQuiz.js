import { useCallback, useState } from 'react';

import { useApi } from '../contexts/ApiContext';

import useData from './useData';

export const useQuizResults = (screenId, opts) => {
    const api = useApi();
    const loader = useCallback(() => api.quiz.results(screenId), [api, screenId]);
    const { data, ...request } = useData(loader, opts);
    return {
        results: data || [],
        ...request,
    };
};

export const useCreateQuiz = ({ screenId, onSuccess = null } = {}) => {
    const api = useApi();
    const [creating, setCreating] = useState(false);
    const create = useCallback(
        (data) => {
            setCreating(true);
            return api.quiz.create({ screen_id: screenId, ...data }).then((response) => {
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
