import { useCallback, useState, useEffect } from 'react';

import { useApi } from '../contexts/ApiContext';

const useAuthUser = ({ checkOnMount = true } = {}) => {
    const [user, setUser] = useState(false);
    const api = useApi();

    const load = useCallback(() => {
        setUser(null);
        return api.auth.check().then((response) => {
            setUser(response);
        });
    }, [api, setUser]);

    useEffect(() => {
        if (checkOnMount) {
            load();
        }
    }, [load, checkOnMount]);

    return { user, load };
};

export default useAuthUser;
