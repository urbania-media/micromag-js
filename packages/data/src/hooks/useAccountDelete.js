import { useCallback, useState } from 'react';

import { useApi } from '../contexts/ApiContext';

const useAccountDelete = () => {
    const [deleting, setDeleting] = useState(false);
    const api = useApi();
    const deleteAccount = useCallback(
        (id) => {
            setDeleting(true);
            return api.account.delete(id).then((response) => {
                setDeleting(false);
                return response;
            });
        },
        [api, setDeleting],
    );
    return { deleteAccount, deleting };
};

export default useAccountDelete;
