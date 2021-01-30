import { useCallback, useState } from 'react';

import { useApi } from '../contexts/ApiContext';

import useData from './useData';

export const useQuiz = ({ screenId, opts = {} } = {}) => {
    const api = useApi();

    const [defaultQuiz] = useState(
        [...new Array(10)].map((el, i) => ({
            choice: `choice-${i + 1}`,
            value: Math.random() > 0.5 ? 1 : 0,
        })),
    );

    const loader = useCallback(() => (api !== null ? api.quiz.results(screenId) : null), [
        api,
        screenId,
    ]);
    const { data, ...request } = api !== null ? useData(loader, opts) : { data: null };

    return {
        quiz: data || defaultQuiz,
        ...request,
    };
};

export default useQuiz;
