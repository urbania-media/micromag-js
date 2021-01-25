/* eslint-disable no-console */
import { Tracking as BaseTracking } from '@folklore/tracking';

class Tracking extends BaseTracking {
    constructor(opts = {}) {
        super(opts);
    }

    trackScreenView(screen, screenIndex, organisation = null) {
        const { id: screenId = null, type: screenType = null } = screen || {};
        const data = {
            event: 'pageView',
            screenId,
            screenType,
            screenIndex,
            organisation,
        };
        console.log('track', data);
        this.push(data);
    }

    trackEvent(category, action, label, { value = null, ...opts } = {}) {
        const data = {
            ...opts,
            event: 'event',
            eventCategory: category,
            eventAction: action,
            eventLabel: label,
            eventValue: value,
        };
        console.log('track', data);
        this.push(data);
    }

    trackMedia(type, media, action, { value = null, ...opts } = {}) {
        const { id: mediaId = null, name = null, duration = null, currentTime = null } = media || {};
        const label = name;
        const data = {
            ...opts,
            event: 'event',
            eventCategory: type,
            eventAction: action,
            eventLabel: label,
            eventValue: value,
            mediaId,
            mediaCurrentTime: currentTime !== null ? Math.round(currentTime) : null,
            mediaProgress:
                currentTime !== null && duration !== null && duration > 0
                    ? Math.round(currentTime / duration * 100)
                    : null,
        };
        console.log('track', data);
        this.push(data);
    }
}

export default Tracking;
