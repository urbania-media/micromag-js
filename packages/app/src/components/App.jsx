/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { IntlProvider } from '@micromag/intl';
import { MemoryRouter } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import * as AppPropTypes from '../lib/PropTypes';
import { RoutesProvider } from '../contexts/RoutesContext';
import Routes from './Routes';

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

const App = ({ locale, memoryRouter, basePath, routes }) => {
    const Router = memoryRouter ? MemoryRouter : BrowserRouter;
    return (
        <IntlProvider locale={locale}>
            <Router basename={basePath}>
                <RoutesProvider routes={routes}>
                    <Routes />
                </RoutesProvider>
            </Router>
        </IntlProvider>
    );
};

App.propTypes = propTypes;
App.defaultProps = defaultProps;

export default App;
