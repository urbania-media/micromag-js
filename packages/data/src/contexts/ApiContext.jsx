/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext, useMemo } from 'react';
import PropTypes from 'prop-types';

import Api from '../lib/Api';

const ApiContext = React.createContext(null);

export const useApi = () => useContext(ApiContext);

const propTypes = {
    children: PropTypes.node.isRequired,
    api: PropTypes.instanceOf(Api),
    baseUrl: PropTypes.string,
    usesCookie: PropTypes.bool,
};

const defaultProps = {
    api: null,
    baseUrl: null,
    usesCookie: false,
};

export const ApiProvider = ({ api: initialApi, baseUrl, usesCookie, children }) => {
    const api = useMemo(
        () =>
            initialApi ||
            new Api({
                baseUrl,
                usesCookie,
            }),
        [initialApi, baseUrl],
    );
    return <ApiContext.Provider value={api}>{children}</ApiContext.Provider>;
};

ApiProvider.propTypes = propTypes;
ApiProvider.defaultProps = defaultProps;

export default ApiContext;
