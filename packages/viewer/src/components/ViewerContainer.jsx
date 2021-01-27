/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { MemoryRouter } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { ScreensProvider } from '@micromag/screens';
import { FieldsProvider } from '@micromag/fields';
import { GoogleMapsClientProvider, RoutesProvider, TrackingProvider } from '@micromag/core/contexts';

import * as ViewerPropTypes from '../lib/PropTypes';
import Viewer from './Viewer';
import ViewerRoutes from './ViewerRoutes';
import defaultRoutes from '../data/routes.json';

import '../styles/styles.global.scss';

const propTypes = {
    memoryRouter: PropTypes.bool,
    basePath: PropTypes.string,
    routes: ViewerPropTypes.routes,
    screen: PropTypes.string,
    withoutRouter: PropTypes.bool,
    gmapsApiKey: PropTypes.string,
    children: PropTypes.func,
};

const defaultProps = {
    memoryRouter: false,
    basePath: null,
    routes: defaultRoutes,
    screen: null,
    withoutRouter: false,
    gmapsApiKey: null,
    children: null,
};

const ViewerContainer = ({ memoryRouter, basePath, routes, withoutRouter, gmapsApiKey, ...otherProps }) => {
    const Router = memoryRouter ? MemoryRouter : BrowserRouter;

    const content = (
        <GoogleMapsClientProvider apiKey={gmapsApiKey}>
            <FieldsProvider>
                <ScreensProvider>
                    <TrackingProvider>
                        {withoutRouter ? <Viewer {...otherProps} /> : <ViewerRoutes {...otherProps} />}
                    </TrackingProvider>
                </ScreensProvider>
            </FieldsProvider>
        </GoogleMapsClientProvider>
    );

    return withoutRouter ? (
        content
    ) : (
        <Router basename={!memoryRouter ? basePath : null}>
            <RoutesProvider routes={routes}>{content}</RoutesProvider>
        </Router>
    );
};

ViewerContainer.propTypes = propTypes;
ViewerContainer.defaultProps = defaultProps;

export default ViewerContainer;
