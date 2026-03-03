/* eslint-disable no-console */
import { Tracking as BaseTracking } from '@folklore/tracking';

class Tracking extends BaseTracking {
    constructor(opts = {}) {
        super(opts);
        this.screensViewed = [];
    }

    trackScreenView(screen, screenIndex) {
        const { screensCount = null } = this.variables || {};
        const {
            id: screenId = null,
            type: screenType = null,
            metadata = null,
            parameters: { metadata: parametersMetadata } = {},
        } = screen || {};

        const { title: screenTitle, description: screenDescrition } =
            metadata || parametersMetadata || {};
        if (this.screensViewed.indexOf(screenId || screenIndex) === -1) {
            this.screensViewed = [...this.screensViewed, screenId || screenIndex];
        }

        const data = {
            event: 'screenView',
            screenId,
            screenType,
            screenIndex,
            screenTitle,
            screenDescrition,
            screenProgress:
                screensCount !== null && screenIndex !== null
                    ? (screenIndex + 1) / screensCount
                    : null,
            screensViewed: this.screensViewed,
            screensViewedProgress:
                screensCount !== null ? this.screensViewed.length / screensCount : null,
        };
        this.push(data);
    }

    trackEvent(category = null, action = null, label = null, opts = null) {
        const { value = null, ...otherOpts } = opts || {};
        const data = {
            ...(otherOpts || null),
            event: 'eventInteraction',
            eventCategory: category,
            eventAction: action,
            eventLabel: label,
            eventValue: value,
        };
        this.push(data);
    }

    trackMedia(type = null, media = null, action = null, opts = null) {
        const { value = null, currentTime: optsCurrentTime = null, ...otherOpts } = opts || {};
        const {
            id: mediaId = null,
            url: mediaUrl = null,
            name: mediaName = null,
            duration: rootDuration = null,
            currentTime = optsCurrentTime,
            metadata = {},
        } = media || {};
        const { duration = rootDuration } = metadata || {};
        const data = {
            ...(otherOpts || null),
            event: 'eventInteraction',
            eventCategory: type,
            eventAction: action,
            eventLabel: mediaName || mediaUrl,
            eventValue: value,
            mediaId,
            mediaUrl,
            mediaName,
        };
        if (duration !== null) {
            data.mediaDuration = Math.round(duration);
        }
        if (currentTime !== null) {
            data.mediaCurrentTime = Math.round(currentTime);
        }
        if (currentTime !== null && duration !== null && duration > 0) {
            data.mediaProgress = currentTime / duration;
        }
        this.push(data);
    }
}

export default Tracking;
