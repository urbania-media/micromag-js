/* eslint-disable react/jsx-props-no-spreading */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { MemoryRouter } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { ScreensProvider } from '@micromag/screens';
import { IntlProvider } from '@micromag/intl';
import fieldsManager from '@micromag/fields';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import {
    GoogleMapsClientProvider,
    GoogleKeysProvider,
    RoutesProvider,
    TrackingProvider,
    FieldsProvider,
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
    locale: PropTypes.string,
    locales: PropTypes.arrayOf(PropTypes.string),
    translations: PropTypes.objectOf(PropTypes.string),
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
    locale: 'en',
    locales: ['fr', 'en'],
    translations: null,
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
        const { id = null, slug = null, title = null } = story;
        return {
            storyId: id,
            storySlug: slug,
            storyTitle: title,
            ...trackingVariables,
        };
    }, [story, trackingVariables]);

    const content = (
        <IntlProvider locale={locale} locales={locales} extraMessages={translations}>
            <GoogleKeysProvider apiKey={googleApiKey}>
                <GoogleMapsClientProvider>
                    <FieldsProvider manager={fieldsManager}>
                        <ScreensProvider>
                            <TrackingProvider variables={finalTrackingVariables}>
                                {withoutRouter ? (
                                    <Viewer story={story} basePath={basePath} {...otherProps} />
                                ) : (
                                    <ViewerRoutes
                                        story={story}
                                        basePath={basePath}
                                        {...otherProps}
                                    />
                                )}
                            </TrackingProvider>
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
