import '../styles/styles.global.css';

import { RoutesProvider } from '@folklore/routes';
import isEmpty from 'lodash-es/isEmpty';
import uniq from 'lodash-es/uniq';
import { Router } from 'wouter';
import { memoryLocation } from 'wouter/memory-location';

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
import type { VideoRenditionSetting } from '@micromag/core/utils';
import { IntlProvider } from '@micromag/intl';
import { ScreensProvider } from '@micromag/screens';

import type { ViewerTransitionMetric } from '../lib/TransitionMeasure';

import Viewer from './Viewer';
import ViewerRoutes from './ViewerRoutes';

import defaultRoutes from '../data/routes.json';

const emptyComponents = {};
const defaultLocales = ['fr', 'en'];

/** Settings of the viewer, read by its screens and elements (other keys are passed through) */
export interface ViewerSettings {
    /** Video formats a host opts in to, besides H.264 mp4 (default `['video/mp4']`) */
    supportedVideoMimes?: string[] | null;
    /**
     * H.264 rendering of the videos, chosen once for the session (default `auto`):
     * - `auto`: `h264_720` (short side at most 720) on a slow connection (`saveData`, `slow-2g`,
     *   `2g`, `3g`), on a frame up to 430 CSS px wide, or up to 800 device pixels wide; `h264`
     *   otherwise. Decided on the client once the frame is measured: on the server, videos render
     *   without `<source>`.
     * - `h264` or `h264_720`: always that rendering, from the first render (server included).
     *
     * A video without `files.h264_720` plays `files.h264`. A host that preloads the first video
     * should preload `getVideoRenditionFile(media, rendition)` with the same rendition
     * (`getVideoRendition` from `@micromag/core/utils`), and pass it here to be sure they match.
     */
    videoRendition?: VideoRenditionSetting;
    [key: string]: unknown;
}

interface ViewerContainerProps {
    story?: Story | null;
    paused?: boolean;
    muted?: boolean;
    screen?: string;
    screenComponents?: Record<string, unknown> | null;
    memoryRouter?: boolean;
    basePath?: string;
    routes?: Record<string, string> | null;
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
    settings?: ViewerSettings | null;
    /** Passed to the Viewer: called after each screen change with timings of the transition */
    onTransitionMetric?: ((metric: ViewerTransitionMetric) => void) | null;
    children?: (...args: unknown[]) => void;
}

function ViewerContainer({
    story = null,
    paused = false,
    muted = true,
    screenComponents = null,
    memoryRouter = false,
    basePath,
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
    const {
        id = null,
        document_id: documentId,
        slug = null,
        title = null,
        components = [],
        organisation,
        metadata,
        settings: storySettings,
    } = story || {};
    const { language: finalLocale = locale } = metadata || {};
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

    const finalTrackingVariables =
        story !== null || trackingVariables !== null
            ? {
                  documentId,
                  storyId: id,
                  storySlug: slug,
                  storyTitle: title,
                  screensCount: (components || []).length,
                  organisationSlug,
                  googleAnalyticsIds: uniq(googleAnalyticsIds),
                  ...trackingVariables,
              }
            : null;

    const supportsWebp = useSupportsWebp();
    const finalSettings = {
        supportsWebp,
        ...settings,
    };

    const { hook: memoryRouterHook, searchHook: memoryRouterSearchHook } = memoryLocation();

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

    return withoutRouter ? (
        content
    ) : (
        <Router
            hook={memoryRouter ? memoryRouterHook : undefined}
            searchHook={memoryRouter ? memoryRouterSearchHook : undefined}
            base={!memoryRouter && basePath !== null ? basePath : undefined}
        >
            <RoutesProvider routes={routes}>{content}</RoutesProvider>
        </Router>
    );
}

export default ViewerContainer;
