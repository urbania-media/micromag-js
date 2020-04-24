/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext, useMemo } from 'react';
import PropTypes from 'prop-types';

import Api from '../lib/api/Api';

const ApiContext = React.createContext(null);

export const useApi = () => useContext(ApiContext);

const propTypes = {
    children: PropTypes.node.isRequired,
    api: PropTypes.instanceOf(Api),
    baseUrl: PropTypes.string,
};

const defaultProps = {
    api: null,
    baseUrl: null,
};

export const ApiProvider = ({ api: initialApi, baseUrl, children }) => {
    const api = useMemo(
        () =>
            initialApi ||
            new Api({
                baseUrl,
            }),
        [initialApi, baseUrl],
    );
    return <ApiContext.Provider value={api}>{children}</ApiContext.Provider>;
};

ApiProvider.propTypes = propTypes;
ApiProvider.defaultProps = defaultProps;

export default ApiContext;
