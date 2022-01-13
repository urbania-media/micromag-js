/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types';
import React from 'react';
import { ApiProvider } from './contexts/ApiContext';
import Api from './lib/Api';

const propTypes = {
    api: PropTypes.instanceOf(Api),
    apiBaseUrl: PropTypes.string,
    children: PropTypes.node,
};

const defaultProps = {
    api: null,
    apiBaseUrl: undefined,
    children: null,
};

const DataProvider = ({ api, apiBaseUrl, children }) => (
    <ApiProvider api={api} baseUrl={apiBaseUrl}>
        {children}
    </ApiProvider>
);

DataProvider.propTypes = propTypes;
DataProvider.defaultProps = defaultProps;

export default DataProvider;
