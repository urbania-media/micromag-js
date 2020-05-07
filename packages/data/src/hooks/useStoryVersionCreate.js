import { useCallback, useState } from 'react';

import { useApi } from '../contexts/ApiContext';

const useStoryVersionCreate = (storyId) => {
    const [creating, setCreating] = useState(false);
    const api = useApi();
    const create = useCallback(
        data => {
            setCreating(true);
            return api.stories.versions.create(storyId, data).then(response => {
                setCreating(false);
                return response;
            });
        },
        [api, storyId, setCreating],
    );
    return { create, creating };
};

export default useStoryVersionCreate;
