import { useCallback, useState } from 'react';

import { useApi } from '../contexts/ApiContext';

const useMediaDelete = () => {
    const [deleting, setDeleting] = useState(false);
    const api = useApi();
    const deleteMedia = useCallback(
        (id, confirm = false) => {
            setDeleting(true);
            return api.medias.delete(id, { confirm }).then((response) => {
                setDeleting(false);
                return response;
            });
        },
        [api, setDeleting],
    );
    return { deleteMedia, deleting };
};

export default useMediaDelete;
