import { useCallback } from 'react';

import { useApi } from '../contexts/ApiContext';

const useCreateMedia = () => {
    const api = useApi();
    const createMedia = useCallback(media => api.medias.create(media), [api]);
    return createMedia;
}

export default useCreateMedia;
