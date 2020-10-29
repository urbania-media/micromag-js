import { useCallback, useState } from 'react';

import { useApi } from '../contexts/ApiContext';

const useAuthForgot = () => {
    const [forgetting, setForgetting] = useState(false);
    const api = useApi();
    const forgot = useCallback(
        (email) => {
            setForgetting(true);
            return api.auth.forgot(email).then((response) => {
                setForgetting(false);
                return response;
            });
        },
        [api, setForgetting],
    );
    return { forgot, forgetting };
};

export default useAuthForgot;
