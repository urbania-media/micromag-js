/* eslint-disable react/jsx-props-no-spreading */
import { useMemoryRouter } from '@folklore/routes';
import { RoutesProvider } from '@folklore/routes';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { Router } from 'wouter';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import {
    GoogleMapsClientProvider,
    GoogleKeysProvider,
    TrackingProvider,
    ComponentsProvider,
    PlaybackProvider,
    VisitorProvider,
    SCREENS_NAMESPACE,
} from '@micromag/core/contexts';
import { IntlProvider } from '@micromag/intl';
import { ScreensProvider } from '@micromag/screens';

import * as ViewerPropTypes from '../lib/PropTypes';

import Viewer from './Viewer';
import ViewerRoutes from './ViewerRoutes';

import '../styles/styles.global.scss';

import defaultRoutes from '../data/routes.json';

const propTypes = {
    story: MicromagPropTypes.story,
    paused: PropTypes.bool,
    screen: PropTypes.string,
    screenComponents: PropTypes.objectOf(PropTypes.elementType),
    memoryRouter: PropTypes.bool,
    basePath: PropTypes.string,
    routes: ViewerPropTypes.routes,
    withoutRouter: PropTypes.bool,
    googleApiKey: PropTypes.string,
    visitor: MicromagPropTypes.visitor,
    trackingVariables: MicromagPropTypes.trackingVariables,
    locale: PropTypes.string,
    locales: PropTypes.arrayOf(PropTypes.string),
    translations: PropTypes.objectOf(PropTypes.string),
    pathWithIndex: PropTypes.bool,
    children: PropTypes.func,
};

const defaultProps = {
    story: null,
    paused: false,
    screen: null,
    screenComponents: null,
    memoryRouter: false,
    basePath: null,
    routes: defaultRoutes,
    withoutRouter: false,
    googleApiKey: null,
    visitor: null,
    trackingVariables: null,
    locale: 'en',
    locales: ['fr', 'en'],
    translations: null,
    pathWithIndex: false,
    children: null,
};

const ViewerContainer = ({
    story,
    paused,
    screenComponents,
    memoryRouter,
    basePath,
    routes,
    withoutRouter,
    googleApiKey,
    visitor,
    trackingVariables,
    locale,
    locales,
    translations,
    pathWithIndex,
    ...otherProps
}) => {
    const finalTrackingVariables = useMemo(() => {
        if (story === null && trackingVariables === null) {
            return null;
        }
        const { id = null, slug = null, title = null, components = [] } = story;

        return {
            storyId: id,
            storySlug: slug,
            storyTitle: title,
            screensCount: (components || []).length,
            ...trackingVariables,
        };
    }, [story, trackingVariables]);

    const { metadata } = story || {};
    const { language: finalLocale = locale } = metadata || {};

    const content = (
        <IntlProvider locale={finalLocale} locales={locales} extraMessages={translations}>
            <GoogleKeysProvider apiKey={googleApiKey}>
                <GoogleMapsClientProvider locale={finalLocale}>
                    <ScreensProvider>
                        <ComponentsProvider
                            namespace={SCREENS_NAMESPACE}
                            components={screenComponents || {}}
                        >
                            <VisitorProvider visitor={visitor}>
                                <PlaybackProvider paused={paused}>
                                    <TrackingProvider variables={finalTrackingVariables}>
                                        {withoutRouter ? (
                                            <Viewer
                                                story={story}
                                                basePath={basePath}
                                                {...otherProps}
                                            />
                                        ) : (
                                            <ViewerRoutes
                                                story={story}
                                                basePath={basePath}
                                                pathWithIndex={pathWithIndex}
                                                {...otherProps}
                                            />
                                        )}
                                    </TrackingProvider>
                                </PlaybackProvider>
                            </VisitorProvider>
                        </ComponentsProvider>
                    </ScreensProvider>
                </GoogleMapsClientProvider>
            </GoogleKeysProvider>
        </IntlProvider>
    );

    const { hook: memoryRouterHook, searchHook: memoryRouterSearchHook } = useMemoryRouter();

    return withoutRouter ? (
        content
    ) : (
        <Router
            base={!memoryRouter ? basePath : null}
            hook={!memoryRouter ? memoryRouterHook : null}
            searchHook={!memoryRouter ? memoryRouterSearchHook : null}
        >
            <RoutesProvider routes={routes}>{content}</RoutesProvider>
        </Router>
    );
};

ViewerContainer.propTypes = propTypes;
ViewerContainer.defaultProps = defaultProps;

export default ViewerContainer;
