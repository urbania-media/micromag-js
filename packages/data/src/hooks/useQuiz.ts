import { useCallback } from 'react';

import { useStory } from '@micromag/core/contexts';

import { useApi } from '../contexts/ApiContext';
import useData from './useData';

export const useQuiz = ({ screenId, storyId: providedStoryId = null, opts = {} } = {}) => {
    const api = useApi();
    const { id: storyId, document_id: documentId } = useStory() || {};

    const loader = useCallback(
        () =>
            api !== null
                ? api.quiz.results(screenId, {
                      story_id: documentId || providedStoryId || storyId,
                  })
                : null,
        [api, screenId, documentId, providedStoryId, storyId],
    );
    const { data, ...request } = api !== null ? useData(loader, opts) : { data: null };

    return {
        quiz: data || [],
        ...request,
    };
};

export default useQuiz;
