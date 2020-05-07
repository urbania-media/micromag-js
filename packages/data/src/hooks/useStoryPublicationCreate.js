import { useCallback, useState } from 'react';

import { useApi } from '../contexts/ApiContext';

const useStoryPublicationCreate = storyId => {
    const [creating, setCreating] = useState(false);
    const api = useApi();
    const create = useCallback(
        (service, settings = null) => {
            setCreating(true);
            return api.stories.publications
                .create(storyId, {
                    ...settings,
                    service,
                })
                .then(response => {
                    setCreating(false);
                    return response;
                });
        },
        [api, storyId, setCreating],
    );
    return { create, creating };
};

export default useStoryPublicationCreate;
