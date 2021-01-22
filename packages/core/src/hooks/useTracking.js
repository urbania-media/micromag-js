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

const hasTracking = (tracking) => typeof tracking !== 'undefined';

export const useTrackScreenView = () => {
    const tracking = useTracking();

    if (!hasTracking(tracking)) {
        return () => {};
    }

    return useCallback((screen = null, index = null) => {
        if (screen !== null && index !== null) {
            tracking.trackScreenView(screen, index);
        }
    }, []);
};

export const useTrackScreenEvent = (type = null) => {
    const tracking = useTracking();

    if (!hasTracking(tracking)) {
        return () => {};
    }

    const screenContext = useScreen();

    return useCallback(
        (action = null, label = null, opts) => {
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

export const useTrackScreenMedia = (type = null) => {
    const tracking = useTracking();

    if (!hasTracking(tracking)) {
        return () => {};
    }

    const screenContext = useScreen();

    return useCallback(
        (media = null, action = null, opts) => {
            if (type !== null && media !== null && action !== null) {
                tracking.trackMedia(`screen_${type}`, media, action, {
                    ...opts,
                    ...getScreenOptions(screenContext, opts),
                });
            }
        },
        [screenContext],
    );
};

export const useTrackEvent = () => {
    const tracking = useTracking();

    if (!hasTracking(tracking)) {
        return () => {};
    }

    return useCallback(
        (category = null, action = null, label = null, opts) => {
            if (category !== null && action !== null) {
                tracking.trackEvent(category, action, label, opts);
            }
        },
        [],
    );
};

export const useTrackMedia = (type = null) => {
    const tracking = useTracking();

    if (!hasTracking(tracking)) {
        return () => {};
    }

    return useCallback(
        (media = null, action = null, opts) => {
            if (type !== null && media !== null && action !== null) {
                tracking.trackMedia(type, media, action, opts);
            }
        },
        [],
    );
};
