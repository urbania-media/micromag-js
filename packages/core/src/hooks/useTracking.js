/* eslint-disable no-console */
import { useCallback } from 'react';
import { useScreen, useTracking } from '../contexts';

export const useTrackScreenView = () => {
    const tracking = useTracking();

    if (typeof tracking === 'undefined') {
        return () => {};
    }

    return useCallback((screen = null, index = null) => {
        if (screen !== null && index !== null) {
            tracking.trackScreenView(screen, index);
        }
    }, []);
};

export const useTrackEvent = () => {
    const tracking = useTracking();

    if (typeof tracking === 'undefined') {
        return () => {};
    }

    return useCallback((category = null, action = null, label = null, opts) => {
        if (category !== null && action !== null) {
            tracking.trackEvent(category, action, label, opts);
        }
    }, []);
};

export const useTrackScreenEvent = () => {
    const tracking = useTracking();

    if (typeof tracking === 'undefined') {
        return () => {};
    }

    const screenContext = useScreen();

    return useCallback((category = null, action = null, label = null, opts) => {
        if (category !== null && action !== null) {
            tracking.trackScreenEvent(category, action, label, opts, screenContext);
        }
    }, []);
};

export const useTrackVideo = () => {
    const tracking = useTracking();

    if (typeof tracking === 'undefined') {
        return () => {};
    }

    const screenContext = useScreen();

    return useCallback((video = null, action = null, opts) => {
        if (video !== null && action !== null) {
            tracking.trackVideo(video, action, opts, screenContext);
        }
    }, []);
};

export const useTrackVideo360 = () => {
    const tracking = useTracking();

    if (typeof tracking === 'undefined') {
        return () => {};
    }

    const screenContext = useScreen();

    return useCallback((video = null, action = null, opts) => {
        if (video !== null && action !== null) {
            tracking.trackVideo360(video, action, opts, screenContext);
        }
    }, []);
};

export const useTrackAudio = () => {
    const tracking = useTracking();

    if (typeof tracking === 'undefined') {
        return () => {};
    }

    const screenContext = useScreen();

    return useCallback((audio = null, action = null, opts) => {
        if (audio !== null && action !== null) {
            tracking.trackAudio(audio, action, opts, screenContext);
        }
    }, []);
};
