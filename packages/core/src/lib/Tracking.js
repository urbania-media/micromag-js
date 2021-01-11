/* eslint-disable no-console */
import { Tracking as BaseTracking } from '@folklore/tracking';

class Tracking extends BaseTracking {
    constructor(opts = {}) {
        super(opts);
        // console.log('tracking constructed', this);
    }

    trackScreenView(screen, screenIndex) {
        const { id: screenId = null, type: screenType = null } = screen || {};
        console.log('trackScreenView', screenId, screenType, screenIndex);

        this.push({
            event: 'pageView',
            screenId,
            screenType,
            screenIndex,
        });
    }

    trackEvent(category, action, { label = null, value = null, ...opts } = {}, screenContext) {
        const { data = null, definition = null } = screenContext || {};
        const { id: screenId = null, type: screenType } = data || {};
        const { id: screenDefinition = null } = definition || {};
        console.log('trackEvent', category, action, label, value, opts);
        this.push({
            ...opts,
            event: 'event',
            eventCategory: category,
            eventAction: action,
            eventLabel: label,
            eventValue: value,
            screenId,
            screenType,
            screenDefinition,
        });
    }

    trackMedia(type, media, action, { label = null, value = null, ...opts } = {}, screenContext) {
        const { id: videoId = null, title = null, duration = null, currentTime = null } = media || {};
        const { data = null, definition = null } = screenContext || {};
        const { id: screenId = null, type: screenType } = data || {};
        const { id: screenDefinition = null } = definition || {};
        console.log(`track${type}`, action, label, value, opts);
        this.push({
            ...opts,
            event: 'event',
            eventCategory: type,
            eventAction: action,
            eventLabel: title,
            screenId,
            screenType,
            screenDefinition,
            videoId,
            videoCurrentTime: currentTime !== null ? Math.round(currentTime) : null,
            videoProgress:
                currentTime !== null && duration !== null && duration > 0
                    ? Math.round(currentTime / duration * 100)
                    : null,
        });
    }

    trackVideo(...params) {
        this.trackMedia('Video', ...params);
    }

    trackAudio(...params) {
        this.trackMedia('Audio', ...params);
    }
}

export default Tracking;
