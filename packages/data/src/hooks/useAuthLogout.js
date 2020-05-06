import { useCallback, useState } from 'react';

import { useApi } from '../contexts/ApiContext';

const useAuthLogout = () => {
    const [loggingOut, setLoggingOut] = useState(false);
    const api = useApi();
    const logout = useCallback(() => {
        setLoggingOut(true);
        return api.auth.logout().then(response => {
            setLoggingOut(false);
            return response;
        });
    }, [api, setLoggingOut]);
    return { logout, loggingOut };
};

export default useAuthLogout;
