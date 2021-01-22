/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { MemoryRouter } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { ScreensProvider } from '@micromag/screens';
import { FieldsProvider } from '@micromag/fields';
import { RoutesProvider, TrackingProvider } from '@micromag/core/contexts';

import * as ViewerPropTypes from '../lib/PropTypes';
import ViewerRoutes from './ViewerRoutes';

import defaultRoutes from '../data/routes.json';

import '../styles/styles.global.scss';

const propTypes = {
    memoryRouter: PropTypes.bool,
    basePath: PropTypes.string,
    routes: ViewerPropTypes.routes,
    screen: PropTypes.string,
    children: PropTypes.func,
};

const defaultProps = {
    memoryRouter: false,
    basePath: null,
    routes: defaultRoutes,
    screen: null,
    children: null,
};

const ViewerContainer = ({ memoryRouter, basePath, routes, ...otherProps }) => {
    const Router = memoryRouter ? MemoryRouter : BrowserRouter;

    return (
        <Router basename={!memoryRouter ? basePath : null}>
            <RoutesProvider routes={routes}>
                <FieldsProvider>
                    <ScreensProvider>
                        <TrackingProvider>
                            <ViewerRoutes {...otherProps} />
                        </TrackingProvider>
                    </ScreensProvider>
                </FieldsProvider>
            </RoutesProvider>
        </Router>
    );
};

ViewerContainer.propTypes = propTypes;
ViewerContainer.defaultProps = defaultProps;

export default ViewerContainer;
