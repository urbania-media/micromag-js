/* eslint-disable react/jsx-props-no-spreading */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { MemoryRouter } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { ScreensProvider } from '@micromag/screens';
import { /* PropTypes as MicromagPropTypes */ Tracking } from '@micromag/core';
import { RoutesProvider } from '@micromag/core/contexts';
import { TrackingContainer, useTracking } from '@folklore/tracking';

import * as ViewerPropTypes from '../lib/PropTypes';
import ViewerRoutes from './ViewerRoutes';

import defaultRoutes from '../data/routes.json';

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

    const contextTracking = useTracking();
    
    const tracking = useMemo(() => (contextTracking) || (new Tracking()), [contextTracking]);

    return (
        <Router basename={!memoryRouter ? basePath : null}>
            <RoutesProvider routes={routes}>
                <ScreensProvider>
                    <TrackingContainer tracking={tracking}>
                        <ViewerRoutes {...otherProps} />
                    </TrackingContainer>
                </ScreensProvider>
            </RoutesProvider>
        </Router>
    );
};

ViewerContainer.propTypes = propTypes;
ViewerContainer.defaultProps = defaultProps;

export default ViewerContainer;
