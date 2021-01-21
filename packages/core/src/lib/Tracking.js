/* eslint-disable no-console */
import { Tracking as BaseTracking } from '@folklore/tracking';

class Tracking extends BaseTracking {
    constructor(opts = {}) {
        super(opts);
    }

    trackScreenView(screen, screenIndex) {
        const { id: screenId = null, type: screenType = null } = screen || {};
        console.log('track screenView', screenId, screenType, screenIndex);

        this.push({
            event: 'pageView',
            screenId,
            screenType,
            screenIndex,
        });
    }

    trackEvent(category, action, label, { value = null, screenId = null, screenType = null, ...opts } = {}) {
        console.log('track event', category, action, label, opts);
        this.push({
            ...opts,
            event: 'event',
            eventCategory: category,
            eventAction: action,
            eventLabel: label,
            eventValue: value,
            screenId,
            screenType,
        });
    }

    trackScreenEvent(category, action, label, { value = null, ...opts } = {}, screenContext) {
        const { data = null } = screenContext || {};
        const { id: screenId = null, type: screenType } = data || {};
        console.log('track event', category, action, label, opts);
        this.push({
            ...opts,
            event: 'event',
            eventCategory: category,
            eventAction: action,
            eventLabel: label,
            eventValue: value,
            screenId,
            screenType,
        });
    }

    trackMedia(type, media, action, { value = null, ...opts } = {}, screenContext) {
        const { id: mediaId = null, name = null, duration = null, currentTime = null } = media || {};
        const { data = null } = screenContext || {};
        const { id: screenId = null, type: screenType } = data || {};
        console.log(`track ${type}`, action, name, opts);
        this.push({
            ...opts,
            event: 'event',
            eventCategory: `screen-${type}`,
            eventAction: action,
            eventLabel: name,
            eventValue: value,
            screenId,
            screenType,
            mediaId,
            mediaCurrentTime: currentTime !== null ? Math.round(currentTime) : null,
            mediaProgress:
                currentTime !== null && duration !== null && duration > 0
                    ? Math.round(currentTime / duration * 100)
                    : null,
        });
    }

    trackVideo(...params) {
        this.trackMedia('video', ...params);
    }

    trackVideo360(...params) {
        this.trackMedia('video-360', ...params);
    }

    trackAudio(...params) {
        this.trackMedia('audio', ...params);
    }
}

export default Tracking;
