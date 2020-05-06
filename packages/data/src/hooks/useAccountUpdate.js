import { useCallback, useState } from 'react';

import { useApi } from '../contexts/ApiContext';

const useAccountUpdate = () => {
    const [updating, setUpdating] = useState(false);
    const api = useApi();
    const update = useCallback(
        data => {
            setUpdating(true);
            return api.account.update(data).then(response => {
                setUpdating(false);
                return response;
            });
        },
        [api, setUpdating],
    );
    return { update, updating };
}

export default useAccountUpdate;
