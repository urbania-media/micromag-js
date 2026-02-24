/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types';
import React, { useContext, useMemo } from 'react';
import Api from '../lib/Api';

const ApiContext = React.createContext(null);

export const useApi = () => useContext(ApiContext);

const propTypes = {
    api: PropTypes.instanceOf(Api),
    baseUrl: PropTypes.string,
    children: PropTypes.node.isRequired,
};

export const ApiProvider = ({ api: initialApi = null, baseUrl = undefined, children }) => {
    const previousApi = useApi();
    const api = useMemo(
        () =>
            initialApi ||
            previousApi ||
            new Api({
                baseUrl,
                // baseUrl: 'https://micromag.studio.test/api',
            }),
        [previousApi, initialApi, baseUrl],
    );
    return <ApiContext.Provider value={api}>{children}</ApiContext.Provider>;
};

ApiProvider.propTypes = propTypes;

export default ApiContext;
