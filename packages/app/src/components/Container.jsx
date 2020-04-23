/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { IntlProvider } from '@micromag/intl';
import { MemoryRouter } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { FieldsProvider } from '@micromag/fields';

import * as AppPropTypes from '../lib/PropTypes';
import { RoutesProvider } from '../contexts/RoutesContext';
import { AuthProvider } from '../contexts/AuthContext';
import App from './App';

import defaultRoutes from '../data/routes.json';

const propTypes = {
    routes: AppPropTypes.routes,
    locale: PropTypes.string,
    memoryRouter: PropTypes.bool,
    basePath: PropTypes.string,
};

const defaultProps = {
    routes: defaultRoutes,
    locale: 'en',
    memoryRouter: false,
    basePath: null,
};

const Container = ({ locale, memoryRouter, basePath, routes }) => {
    const Router = memoryRouter ? MemoryRouter : BrowserRouter;
    return (
        <FieldsProvider>
            <IntlProvider locale={locale}>
                <Router basename={basePath}>
                    <RoutesProvider routes={routes}>
                        <AuthProvider>
                            <App />
                        </AuthProvider>
                    </RoutesProvider>
                </Router>
            </IntlProvider>
        </FieldsProvider>
    );
};

Container.propTypes = propTypes;
Container.defaultProps = defaultProps;

export default Container;
