/* eslint-disable no-console */
import { Tracking as BaseTracking } from '@folklore/tracking';

class Tracking extends BaseTracking {
    constructor(opts = {}) {
        super(opts);
        const { variables = null } = this.options;
        this.variables = null;
        this.screensViewed = [];
        if (variables !== null) {
            this.setVariables(variables);
        }
    }

    setVariables(variables) {
        this.variables = variables;
        if (variables !== null) {
            this.push(variables);
        }
    }

    getVariables() {
        return this.variables;
    }

    trackScreenView(screen, screenIndex) {
        const { screensCount = null } = this.variables || {};
        const { id: screenId = null, type: screenType = null, metadata = {} } = screen || {};
        const { title: screenTitle } = metadata || {};
        if (this.screensViewed.indexOf(screenId || index) !== -1) {
            this.screensViewed = [...this.screensViewed, screenId || index];
        }

        const data = {
            event: 'screenView',
            screenId,
            screenType,
            screenIndex,
            screenTitle,
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

    trackEvent(category, action, label, { value = null, ...opts } = {}) {
        const data = {
            ...opts,
            event: 'eventInteraction',
            eventCategory: category,
            eventAction: action,
            eventLabel: label,
            eventValue: value,
        };
        this.push(data);
    }

    trackMedia(
        type,
        media,
        action,
        { value = null, currentTime: optsCurrentTime = null, ...opts } = {},
    ) {
        const {
            id: mediaId = null,
            name = null,
            duration: rootDuration = null,
            currentTime = optsCurrentTime,
            metadata = {},
        } = media || {};
        const { duration = rootDuration } = metadata || {};
        const label = name;
        const data = {
            ...opts,
            event: 'eventInteraction',
            eventCategory: type,
            eventAction: action,
            eventLabel: label,
            eventValue: value,
            mediaId,
            mediaCurrentTime: currentTime !== null ? Math.round(currentTime) : null,
            mediaProgress:
                currentTime !== null && duration !== null && duration > 0
                    ? Math.round((currentTime / duration) * 100)
                    : null,
        };
        this.push(data);
    }
}

export default Tracking;
