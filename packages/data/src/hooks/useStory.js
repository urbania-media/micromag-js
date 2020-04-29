import { useCallback } from 'react';
import { useApi } from '../contexts/ApiContext';

import useData from './useData';

const useStory = (id, opts) => {
    const api = useApi();
    const loader = useCallback(() => api.stories.find(id), [api, id]);
    const { data, ...request } = useData(loader, opts);
    return {
        story: data,
        ...request,
    };
};

export default useStory;
