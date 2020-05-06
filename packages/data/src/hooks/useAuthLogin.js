import { useCallback, useState } from 'react';

import { useApi } from '../contexts/ApiContext';

const useAuthLogin = () => {
    const [logging, setLogging] = useState(false);
    const api = useApi();
    const login = useCallback(
        (email, password) => {
            setLogging(true);
            return api.auth.login(email, password).then(response => {
                setLogging(false);
                return response;
            });
        },
        [api, setLogging],
    );
    return { login, logging };
};

export default useAuthLogin;
