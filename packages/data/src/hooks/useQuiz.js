import { useCallback } from 'react';

import { useApi } from '../contexts/ApiContext';

import useData from './useData';

export const useQuiz = ({ screenId, opts = {} } = {}) => {
    const api = useApi();

    const loader = useCallback(() => (api !== null ? api.quiz.results(screenId) : null), [
        api,
        screenId,
    ]);
    const { data, ...request } = api !== null ? useData(loader, opts) : { data: null };

    return {
        quiz: data || [],
        ...request,
    };
};

export default useQuiz;
