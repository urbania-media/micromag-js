import { useCallback, useState } from 'react';

import { useApi } from '../contexts/ApiContext';

const useAuthCheck = () => {
    const [checking, setChecking] = useState(false);
    const api = useApi();
    const check = useCallback(() => {
        setChecking(true);
        return api.auth.check().then(response => {
            setChecking(false);
            return response;
        });
    }, [api, setChecking]);
    return { check, checking };
};

export default useAuthCheck;
