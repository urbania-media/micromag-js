import { useCallback, useState } from 'react';

import { useApi } from '../contexts/ApiContext';

const useMediaRequestDelete = () => {
    const [requesting, setRequesting] = useState(false);
    const api = useApi();
    const requestDeleteMedia = useCallback(
        (id) => {
            setRequesting(true);
            return api.medias.requestDeleteMedia(id).then((response) => {
                setRequesting(false);
                return response;
            });
        },
        [api, setRequesting],
    );
    return { requestDeleteMedia, requesting };
};

export default useMediaRequestDelete;
