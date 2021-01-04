/* eslint-disable no-console */
import { Tracking as BaseTracking } from '@folklore/tracking';

class Tracking extends BaseTracking {
    constructor(opts = {}) {        
        super(opts);
        console.log('tracking constructed', this);
    }

    trackScreenView(screenId, screenIndex) {
        console.log('track screen view', screenId, screenIndex, this);
        // this.push({
        //     event: 'pageView',
        //     screenId: id,
        //     screenIndex,
        // });
    }

    trackEvent(screenId, category, action, label = null, value = null) {
        console.log('track event', screenId, category, action, label, value , this);
        // this.push({
        //     event: 'event',
        //     eventCategory: category,
        //     eventAction: action,
        //     eventLabel: label,
        //     eventValue: value,
        //     screenId: id,
        // });
    }

    trackVideo(
        screenId,
        action,
        {
            id = null,
            title = null,
            duration = null,
            currentTime = null,
        } = {},
    ) {
        console.log('track video', screenId, action, id, title, duration, currentTime, this);
        // this.push({
        //     event: 'event',
        //     eventCategory: 'Video',
        //     eventAction: action,
        //     eventLabel: title,
        //     screenId: screenId,
        //     videoId: id,
        //     videoCurrentTime: currentTime !== null ? Math.round(currentTime) : null,
        //     videoProgress:
        //         currentTime !== null && duration !== null && duration > 0
        //             ? Math.round(currentTime / duration * 100)
        //             : null,
        // });
    }

    trackAudio(
        screenId,
        action,
        {
            id = null,
            title = null,
            duration = null,
            currentTime = null,
        } = {},
    ) {
        console.log('track audio', screenId, action, id, title, duration, currentTime, this);
        // this.push({
        //     event: 'event',
        //     eventCategory: 'Audio',
        //     eventAction: action,
        //     eventLabel: title,
        //     screenId: screenId,
        //     audioId: id,
        //     audioDuration: duration,
        //     audioCurrentTime: currentTime !== null ? Math.round(currentTime) : null,
        //     audioProgress:
        //         currentTime !== null && duration !== null && duration > 0
        //             ? Math.round(currentTime / duration * 100)
        //             : null,        
        // });
    }
}

export default Tracking;
