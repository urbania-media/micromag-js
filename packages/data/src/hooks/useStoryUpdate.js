import { useCallback, useState } from 'react';

import { useApi } from '../contexts/ApiContext';

const useStoryUpdate = storyId => {
    const [updating, setUpdating] = useState(false);
    const api = useApi();
    const update = useCallback(
        story => {
            setUpdating(true);
            return api.stories.update(storyId, story).then(response => {
                setUpdating(false);
                return response;
            });
        },
        [api, storyId, setUpdating],
    );
    return { update, updating };
};

export default useStoryUpdate;
