/* eslint-disable no-console */
import { useCallback } from 'react';
import { useTracking } from '@folklore/tracking';

import { useScreen } from '../contexts/ScreenContext';

import Tracking from '../lib/Tracking';
 
export { useTracking };

export const useTrackScreenView = () => {
    const tracking = useTracking() || new Tracking();// @TODO

    return useCallback((screen = null, index = null) => {
        if (screen !== null && index !== null) {
            tracking.trackScreenView(screen, index);
        }
    }, []);
};

export const useTrackEvent = () => {
    const tracking = useTracking() || new Tracking();// @TODO
    const screenContext = useScreen();

    return useCallback((category = null, action = null, opts) => {
        if (category !== null && action !== null) {
            tracking.trackEvent(category, action, opts, screenContext);
        }
    }, []);
};

export const useTrackVideo = () => {
    const tracking = useTracking() || new Tracking();// @TODO
    const screenContext = useScreen();

    return useCallback((video = null, action = null, opts) => {
        if (video !== null && action !== null) {
            tracking.trackVideo(video, action, opts, screenContext);
        }
    }, []);
};

export const useTrackAudio = () => {
    const tracking = useTracking() || new Tracking();// @TODO
    const screenContext = useScreen();

    return useCallback((audio = null, action = null, opts) => {
        if (audio !== null && action !== null) {
            tracking.trackAudio(audio, action, opts, screenContext);
        }
    }, []);
};
