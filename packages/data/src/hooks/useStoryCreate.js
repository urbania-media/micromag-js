import { useCallback, useState } from 'react';

import { useApi } from '../contexts/ApiContext';

const useStoryCreate = () => {
    const [creating, setCreating] = useState(false);
    const api = useApi();
    const create = useCallback(
        data => {
            setCreating(true);
            return api.stories.create(data).then(response => {
                setCreating(false);
                return response;
            });
        },
        [api, setCreating],
    );
    return { create, creating };
};

export default useStoryCreate;
