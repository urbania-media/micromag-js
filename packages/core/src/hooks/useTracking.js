import { useCallback } from 'react';
import { useTracking } from '@folklore/tracking';

export { useTracking };


const useMicromagTracking = () => {
    const tracking = useTracking();

    const trackScreenView = useCallback((...params) => {
        console.log('trackScreenView', params);
        // tracking.trackScreenView(params);
    }, [tracking]);

    const trackEvent = useCallback((...params) => {
        console.log('trackEvent', params);
        // tracking.trackEvent(params);
    }, [tracking]);

    const trackAudio = useCallback((...params) => {
        console.log('trackAudio', params);
        // tracking.trackAudio(params);
    }, [tracking]);

    const trackVideo = useCallback((...params) => {
        console.log('trackVideo', params);
        // tracking.trackVideo(params);
    }, [tracking]);

    return {trackScreenView, trackEvent, trackAudio, trackVideo};
};

// export const useTrackScreenView = () => {
//     const tracking = useTracking();

//     return useCallback((id = null, category = null, action = null, label, value) => {
//         if (id !== null && category !== null && action !== null) {
//             tracking.trackScreenView(id, category, action, label, value);
//         }
//     }, []);
// };

// export const useTrackEvent = () => {
//     const tracking = useTracking();

//     return useCallback((id = null, category = null, action = null, label, value) => {
//         if (id !== null && category !== null && action !== null) {
//             tracking.trackEvent(id, category, action, label, value);
//         }
//     }, []);
// };

// export const useTrackVideo = () => {
//     const tracking = useTracking();

//     return useCallback((id = null, action = null, video = null) => {
//         if (id !== null && action !== null && video !== null) {
//             tracking.trackVideo(id, action, video);
//         }
//     }, []);
// };

// export const useTrackAudio = () => {
//     const tracking = useTracking();

//     return useCallback((id = null, action = null, label, audio = null) => {
//         if (id !== null && action !== null && audio !== null) {
//             tracking.trackAudio(id, action, audio);
//         }
//     }, []);
// };

export default useMicromagTracking;
