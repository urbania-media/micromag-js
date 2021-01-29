/* eslint-disable react/jsx-props-no-spreading */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { MemoryRouter } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { ScreensProvider } from '@micromag/screens';
import { FieldsProvider } from '@micromag/fields';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import {
    GoogleMapsClientProvider,
    GoogleKeysProvider,
    RoutesProvider,
    TrackingProvider,
} from '@micromag/core/contexts';

import * as ViewerPropTypes from '../lib/PropTypes';
import Viewer from './Viewer';
import ViewerRoutes from './ViewerRoutes';
import defaultRoutes from '../data/routes.json';

import '../styles/styles.global.scss';

const propTypes = {
    story: MicromagPropTypes.story,
    screen: PropTypes.string,
    memoryRouter: PropTypes.bool,
    basePath: PropTypes.string,
    routes: ViewerPropTypes.routes,
    withoutRouter: PropTypes.bool,
    googleApiKey: PropTypes.string,
    trackingVariables: MicromagPropTypes.trackingVariables,
    children: PropTypes.func,
};

const defaultProps = {
    story: null,
    screen: null,
    memoryRouter: false,
    basePath: null,
    routes: defaultRoutes,
    withoutRouter: false,
    googleApiKey: null,
    trackingVariables: null,
    children: null,
};

const ViewerContainer = ({
    story,
    memoryRouter,
    basePath,
    routes,
    withoutRouter,
    googleApiKey,
    trackingVariables,
    ...otherProps
}) => {
    const Router = memoryRouter ? MemoryRouter : BrowserRouter;

    const finalTrackingVariables = useMemo(() => {
        if (story === null && trackingVariables === null) {
            return null;
        }
        const { id = null, slug = null, title = null } = story;
        return {
            storyId: id,
            storySlug: slug,
            storyTitle: title,
            ...trackingVariables,
        };
    }, [story, trackingVariables]);

    const content = (
        <GoogleKeysProvider apiKey={googleApiKey}>
            <GoogleMapsClientProvider>
                <FieldsProvider>
                    <ScreensProvider>
                        <TrackingProvider variables={finalTrackingVariables}>
                            {withoutRouter ? (
                                <Viewer story={story} {...otherProps} />
                            ) : (
                                <ViewerRoutes story={story} {...otherProps} />
                            )}
                        </TrackingProvider>
                    </ScreensProvider>
                </FieldsProvider>
            </GoogleMapsClientProvider>
        </GoogleKeysProvider>
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
