import { useCallback, useState } from 'react';

import { useApi } from '../contexts/ApiContext';

const useUpdateStory = storyId => {
    const [updating, setUpdating] = useState(false);
    const api = useApi();
    const updateStory = useCallback(
        story => {
            setUpdating(true);
            return api.stories.update(storyId, story).then(response => {
                setUpdating(false);
                return response;
            });
        },
        [api, storyId, setUpdating],
    );
    return { updateStory, updating };
};

export default useUpdateStory;
