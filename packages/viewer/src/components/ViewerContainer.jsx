/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { MemoryRouter } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import {
    GoogleMapsClientProvider,
    GoogleKeysProvider,
    RoutesProvider,
    TrackingProvider,
    FieldsProvider,
    ComponentsProvider,
    PlaybackProvider,
    VisitorProvider,
    SCREENS_NAMESPACE,
} from '@micromag/core/contexts';
import fieldsManager from '@micromag/fields/manager';
import { IntlProvider } from '@micromag/intl';
import { ScreensProvider } from '@micromag/screens';

import * as ViewerPropTypes from '../lib/PropTypes';

import Viewer from './Viewer';
import ViewerRoutes from './ViewerRoutes';

import '../styles/styles.global.scss';

import defaultRoutes from '../data/routes.json';

const propTypes = {
    story: MicromagPropTypes.story,
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
    const Router = memoryRouter ? MemoryRouter : BrowserRouter;

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
                    <FieldsProvider manager={fieldsManager}>
                        <ScreensProvider>
                            <ComponentsProvider
                                namespace={SCREENS_NAMESPACE}
                                components={screenComponents || {}}
                            >
                                <VisitorProvider visitor={visitor}>
                                    <PlaybackProvider>
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
                    </FieldsProvider>
                </GoogleMapsClientProvider>
            </GoogleKeysProvider>
        </IntlProvider>
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
