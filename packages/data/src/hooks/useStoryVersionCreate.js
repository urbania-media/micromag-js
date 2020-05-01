import { useCallback, useState } from 'react';

import { useApi } from '../contexts/ApiContext';

const useStoryVersionCreate = (storyId) => {
    const [creating, setCreating] = useState(false);
    const api = useApi();
    const create = useCallback(
        story => {
            setCreating(true);
            return api.stories.versions.create(storyId, story).then(response => {
                setCreating(false);
                return response;
            });
        },
        [api, storyId, setCreating],
    );
    return { create, creating };
};

export default useStoryVersionCreate;
