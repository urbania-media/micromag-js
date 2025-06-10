import { useCallback, useState } from 'react';

import { useStory } from '@micromag/core/contexts';

import { useApi } from '../contexts/ApiContext';
import useData from './useData';

export const useContributions = ({ screenId, storyId: providedStoryId = null, opts = {} } = {}) => {
    const api = useApi();
    const { id: storyId, document_id: documentId } = useStory() || {};

    const [defaultContributions] = useState(
        [...new Array(10)].map((el, i) => ({
            name: `Nom ${i + 1}`,
            message: `Message ${i + 1}`,
        })),
    );

    const loader = useCallback(
        () =>
            api !== null
                ? api.contributions.get(screenId, {
                      story_id: documentId || providedStoryId || storyId,
                  })
                : null,
        [api, screenId, documentId, providedStoryId, storyId],
    );
    const { data, ...request } = api !== null ? useData(loader, opts) : { data: null };

    return {
        contributions: data || defaultContributions,
        ...request,
    };
};

export default useContributions;
