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
    UserInteractionProvider,
    ComponentsProvider,
    SCREENS_NAMESPACE,
} from '@micromag/core/contexts';
import fieldsManager from '@micromag/fields/manager';
import { IntlProvider } from '@micromag/intl';
import { ScreensProvider } from '@micromag/screens';
import defaultRoutes from '../data/routes.json';
import * as ViewerPropTypes from '../lib/PropTypes';
import '../styles/styles.global.scss';
import Viewer from './Viewer';
import ViewerRoutes from './ViewerRoutes';

const propTypes = {
    story: MicromagPropTypes.story,
    screen: PropTypes.string,
    screenComponents: PropTypes.objectOf(PropTypes.elementType),
    memoryRouter: PropTypes.bool,
    basePath: PropTypes.string,
    routes: ViewerPropTypes.routes,
    withoutRouter: PropTypes.bool,
    googleApiKey: PropTypes.string,
    trackingVariables: MicromagPropTypes.trackingVariables,
    locale: PropTypes.string,
    locales: PropTypes.arrayOf(PropTypes.string),
    translations: PropTypes.objectOf(PropTypes.string),
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
    trackingVariables: null,
    locale: 'en',
    locales: ['fr', 'en'],
    translations: null,
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
    trackingVariables,
    locale,
    locales,
    translations,
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
                                <UserInteractionProvider>
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
                                                {...otherProps}
                                            />
                                        )}
                                    </TrackingProvider>
                                </UserInteractionProvider>
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
