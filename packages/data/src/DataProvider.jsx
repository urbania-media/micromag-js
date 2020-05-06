/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

import { ApiProvider } from './contexts/ApiContext';

const propTypes = {
    apiBaseUrl: PropTypes.string,
    apiUsesCookie: PropTypes.bool,
    children: PropTypes.node,
};

const defaultProps = {
    apiBaseUrl: undefined,
    apiUsesCookie: false,
    children: null,
};

const DataProvider = ({ apiBaseUrl, apiUsesCookie, children }) => (
    <ApiProvider baseUrl={apiBaseUrl} usesCookie={apiUsesCookie}>
        {children}
    </ApiProvider>
);

DataProvider.propTypes = propTypes;
DataProvider.defaultProps = defaultProps;

export default DataProvider;
