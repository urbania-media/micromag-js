/* eslint-disable no-console */
import { useCallback } from 'react';

import { useScreen, useTracking } from '../contexts';

const getScreenOptions = (screenContext, opts) => {
    const { data: ctxData = null } = screenContext || {};
    const { id: ctxScreenId = null, type: ctxScreenType } = ctxData || {};
    const { screenId: optsScreenId = null, screenType: optsScreenType = null } = opts || {};
    const screenId = ctxScreenId !== null ? ctxScreenId : optsScreenId;
    const screenType = ctxScreenType !== null ? ctxScreenType : optsScreenType;
    return {
        screenId,
        screenType,
    };
};

const hasTracking = (tracking) => typeof tracking !== 'undefined' && tracking !== null;

export const useTrackScreenView = () => {
    const tracking = useTracking();

    return useCallback(
        (screen = null, index = null) => {
            if (!hasTracking(tracking)) {
                return;
            }
            if (screen !== null && index !== null) {
                tracking.trackScreenView(screen, index);
            }
        },
        [tracking],
    );
};

export const useTrackScreenEvent = (type = null) => {
    const tracking = useTracking();

    if (!hasTracking(tracking)) {
        return () => {};
    }

    const screenContext = useScreen();

    if (screenContext.renderContext !== 'view') {
        return () => {};
    }

    return useCallback(
        (action = null, label = null, opts = null) => {
            if (type !== null && action !== null) {
                tracking.trackEvent(`screen_${type}`, action, label, {
                    ...opts,
                    ...getScreenOptions(screenContext, opts),
                });
            }
        },
        [screenContext],
    );
};

export const useTrackScreenMedia = (type: string | null = null) => {
    const tracking = useTracking();

    const screenContext = useScreen();

    return useCallback(
        (media = null, action = null, opts = null) => {
            if (!hasTracking(tracking) || screenContext.renderContext !== 'view') {
                return;
            }
            if (type !== null && media !== null && action !== null) {
                tracking.trackMedia(`screen_${type}`, media, action, {
                    ...opts,
                    ...getScreenOptions(screenContext, opts),
                });
            }
        },
        [tracking, screenContext, type],
    );
};

export const useTrackEvent = () => {
    const tracking = useTracking();

    return useCallback(
        (category = null, action = null, label = null, opts = null) => {
            if (!hasTracking(tracking)) {
                return;
            }
            if (category !== null && action !== null) {
                tracking.trackEvent(category, action, label, opts);
            }
        },
        [tracking],
    );
};

export const useTrackMedia = (type = null) => {
    const tracking = useTracking();

    return useCallback((media = null, action = null, opts = null) => {
        if (!hasTracking(tracking)) {
            return;
        }
        if (type !== null && media !== null && action !== null) {
            tracking.trackMedia(type, media, action, opts);
        }
    }, []);
};
