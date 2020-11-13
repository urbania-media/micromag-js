import { useCallback, useState } from 'react';

import { useApi } from '../contexts/ApiContext';

const useStoryDelete = (storyId) => {
    const [deleting, setDeleting] = useState(false);
    const api = useApi();
    const deleteStory = useCallback(() => {
        setDeleting(true);
        return api.stories.delete(storyId).then((response) => {
            setDeleting(false);
            return response;
        });
    }, [api, storyId, setDeleting]);
    return { deleteStory, deleting };
};

export default useStoryDelete;
