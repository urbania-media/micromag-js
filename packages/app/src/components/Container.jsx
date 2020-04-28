/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { IntlProvider } from '@micromag/intl';
import { MemoryRouter } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { RoutesProvider } from '@micromag/core/contexts';
import { FieldsProvider } from '@micromag/fields';

import * as AppPropTypes from '../lib/PropTypes';
import { AuthProvider } from '../contexts/AuthContext';
import { ApiProvider } from '../contexts/ApiContext';
import App from './App';

import defaultRoutes from '../data/routes.json';

const propTypes = {
    routes: AppPropTypes.routes,
    locale: PropTypes.string,
    memoryRouter: PropTypes.bool,
    basePath: PropTypes.string,
    apiBaseUrl: PropTypes.string,
    apiUsesCookie: PropTypes.bool,
    authCheckOnMount: PropTypes.bool,
};

const defaultProps = {
    routes: defaultRoutes,
    locale: 'en',
    memoryRouter: false,
    basePath: null,
    apiBaseUrl: null,
    apiUsesCookie: false,
    authCheckOnMount: false,
};

const Container = ({ locale, memoryRouter, basePath, apiBaseUrl, apiUsesCookie, authCheckOnMount, routes }) => {
    const Router = memoryRouter ? MemoryRouter : BrowserRouter;
    return (
        <FieldsProvider>
            <IntlProvider locale={locale}>
                <Router basename={basePath}>
                    <ApiProvider baseUrl={apiBaseUrl} usesCookie={apiUsesCookie}>
                        <RoutesProvider routes={routes}>
                            <AuthProvider checkOnMount={authCheckOnMount}>
                                <App />
                            </AuthProvider>
                        </RoutesProvider>
                    </ApiProvider>
                </Router>
            </IntlProvider>
        </FieldsProvider>
    );
};

Container.propTypes = propTypes;
Container.defaultProps = defaultProps;

export default Container;
