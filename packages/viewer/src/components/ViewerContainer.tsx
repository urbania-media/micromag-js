/* eslint-disable react/jsx-props-no-spreading */
import '../styles/styles.global.css';

import { RoutesProvider, useMemoryRouter } from '@folklore/routes';
import isEmpty from 'lodash/isEmpty';
import uniq from 'lodash/uniq';
import React, { useMemo } from 'react';
import { Router } from 'wouter';

import type { Story, TrackingVariables, Visitor } from '@micromag/core';
import {
    ComponentsProvider,
    GoogleKeysProvider,
    GoogleMapsClientProvider,
    PlaybackProvider,
    SCREENS_NAMESPACE,
    SettingsProvider,
    TrackingProvider,
    VisitorProvider,
} from '@micromag/core/contexts';
import { useSupportsWebp } from '@micromag/core/hooks';
import { IntlProvider } from '@micromag/intl';
import { ScreensProvider } from '@micromag/screens';

import Viewer from './Viewer';
import ViewerRoutes from './ViewerRoutes';

import defaultRoutes from '../data/routes.json';

const emptyComponents = {};
const defaultLocales = ['fr', 'en'];

interface ViewerContainerProps {
    story?: Story | null;
    paused?: boolean;
    muted?: boolean;
    screen?: string;
    screenComponents?: Record<string, unknown> | null;
    memoryRouter?: boolean;
    basePath?: string | null;
    routes?: unknown;
    withoutRouter?: boolean;
    googleApiKey?: string | null;
    visitor?: Visitor | null;
    locale?: string;
    locales?: string[];
    translations?: Record<string, string> | null;
    pathWithIndex?: boolean;
    trackingVariables?: TrackingVariables | null;
    trackingDisabled?: boolean;
    trackingPaused?: boolean;
    settings?: Record<string, unknown> | null;
    children?: (...args: unknown[]) => void;
}

function ViewerContainer({
    story = null,
    paused = false,
    muted = true,
    screenComponents = null,
    memoryRouter = false,
    basePath = null,
    routes = defaultRoutes,
    withoutRouter = false,
    googleApiKey = null,
    visitor = null,
    locale = 'en',
    locales = defaultLocales,
    translations = null,
    pathWithIndex = false,
    trackingVariables = null,
    trackingDisabled = false,
    trackingPaused = false,
    settings = null,
    ...otherProps
}: ViewerContainerProps) {
    const finalTrackingVariables = useMemo(() => {
        if (story === null && trackingVariables === null) {
            return null;
        }
        const {
            id = null,
            document_id: documentId,
            slug = null,
            title = null,
            components = [],
            organisation,
            settings: storySettings,
        } = story || {};
        const { slug: organisationSlug, tracking: orgTracking } = organisation || {};
        const { codes: orgCodes = [] } = orgTracking || {};
        const { tracking: storyTracking } = storySettings || {};
        const { codes: storyCodes = [] } = storyTracking || {};

        const googleAnalyticsIds = [...(orgCodes || []), ...(storyCodes || [])]
            .filter((storyCode) => {
                const { type, id: trackingId } = storyCode || {};
                return type === 'ga4' && !isEmpty(trackingId);
            })
            .map(({ id: trackingId }) => trackingId);

        return {
            documentId,
            storyId: id,
            storySlug: slug,
            storyTitle: title,
            screensCount: (components || []).length,
            organisationSlug,
            googleAnalyticsIds: uniq(googleAnalyticsIds),
            ...trackingVariables,
        };
    }, [story, trackingVariables]);

    const { metadata } = story || {};
    const { language: finalLocale = locale } = metadata || {};

    const supportsWebp = useSupportsWebp();
    const finalSettings = useMemo(
        () => ({
            supportsWebp,
            ...settings,
        }),
        [settings, supportsWebp],
    );

    const content = (
        <SettingsProvider settings={finalSettings}>
            <IntlProvider locale={finalLocale} locales={locales} extraMessages={translations}>
                <GoogleKeysProvider apiKey={googleApiKey}>
                    <GoogleMapsClientProvider locale={finalLocale}>
                        <ScreensProvider>
                            <ComponentsProvider
                                namespace={SCREENS_NAMESPACE}
                                components={screenComponents || emptyComponents}
                            >
                                <VisitorProvider visitor={visitor}>
                                    <PlaybackProvider paused={paused} muted={muted}>
                                        <TrackingProvider
                                            variables={finalTrackingVariables}
                                            disabled={trackingDisabled}
                                            paused={trackingPaused}
                                        >
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
        </SettingsProvider>
    );

    const { hook: memoryRouterHook, searchHook: memoryRouterSearchHook } = useMemoryRouter();
    const routerProps = useMemo(
        () => ({
            hook: memoryRouter ? memoryRouterHook : null,
            searchHook: memoryRouter ? memoryRouterSearchHook : null,
            base: !memoryRouter ? basePath : null,
        }),
        [basePath, memoryRouter],
    );

    return withoutRouter ? (
        content
    ) : (
        <Router {...routerProps}>
            <RoutesProvider routes={routes}>{content}</RoutesProvider>
        </Router>
    );
}

export default ViewerContainer;
