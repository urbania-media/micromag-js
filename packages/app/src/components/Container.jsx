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
};

const defaultProps = {
    routes: defaultRoutes,
    locale: 'en',
    memoryRouter: false,
    basePath: null,
    apiBaseUrl: null,
};

const Container = ({ locale, memoryRouter, basePath, apiBaseUrl, routes }) => {
    const Router = memoryRouter ? MemoryRouter : BrowserRouter;
    return (
        <FieldsProvider>
            <IntlProvider locale={locale}>
                <Router basename={basePath}>
                    <ApiProvider baseUrl={apiBaseUrl}>
                        <AuthProvider>
                            <RoutesProvider routes={routes}>
                                <App />
                            </RoutesProvider>
                        </AuthProvider>
                    </ApiProvider>
                </Router>
            </IntlProvider>
        </FieldsProvider>
    );
};

Container.propTypes = propTypes;
Container.defaultProps = defaultProps;

export default Container;
