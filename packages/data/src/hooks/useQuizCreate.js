import { useCallback, useState } from 'react';

import { useVisitor, useStory } from '@micromag/core/contexts';

import { useApi } from '../contexts/ApiContext';

export const useQuizCreate = ({
    screenId,
    visitorId: providedVisitorId = null,
    storyId: providedStoryId = null,
    onSuccess = null,
} = {}) => {
    const api = useApi();
    const [creating, setCreating] = useState(false);
    const { id: visitorId } = useVisitor() || {};
    const { id: storyId } = useStory() || {};

    const create = useCallback(
        (data) => {
            if (api === null) {
                return null;
            }
            setCreating(true);
            return api.quiz
                .create({
                    screen_id: screenId,
                    visitor_id: providedVisitorId || visitorId,
                    story_id: providedStoryId || storyId,
                    ...data,
                })
                .then((response) => {
                    setCreating(false);
                    if (onSuccess !== null) {
                        onSuccess(response);
                    }
                    return response;
                });
        },
        [api, setCreating, onSuccess, screenId, visitorId, storyId, providedVisitorId, providedStoryId],
    );
    return { create, creating };
};

export default useQuizCreate;
