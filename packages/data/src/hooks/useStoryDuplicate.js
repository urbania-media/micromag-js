import { useCallback, useState } from 'react';

import { useApi } from '../contexts/ApiContext';

const useStoryDuplicate = (storyId) => {
    const [duplicating, setDuplicating] = useState(false);
    const api = useApi();
    const duplicate = useCallback(
        (data) => {
            setDuplicating(true);
            return api.stories.duplicate(storyId, data).then((response) => {
                setDuplicating(false);
                return response;
            });
        },
        [api, storyId, setDuplicating],
    );
    return { duplicate, duplicating };
};

export default useStoryDuplicate;
