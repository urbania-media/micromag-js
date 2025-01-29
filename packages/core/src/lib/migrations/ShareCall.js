/* eslint-disable class-methods-use-this */
class ShareCall {
    test(screen) {
        const { shareIncentive = null, callToAction = null } = screen || {};

        if (shareIncentive === null && callToAction === null) {
            return false;
        }

        return true;
    }

    parse(screen) {
        const { shareIncentive = null, callToAction = null, ...restScreen } = screen || {};

        const { header = null, footer = null } = screen || {};

        // Carful for recursivity here cause same key name
        const newHeader =
            shareIncentive !== null
                ? {
                      ...(shareIncentive !== null ? { shareIncentive } : null),
                      ...(header !== null ? { header } : null),
                  }
                : header;

        const newFooter =
            callToAction !== null
                ? {
                      ...(callToAction !== null ? { callToAction } : null),
                      ...(footer !== null ? { footer } : null),
                  }
                : footer;

        const newScreen = {
            ...restScreen,
            ...(newHeader !== null ? { header: newHeader } : null),
            ...(newFooter !== null ? { footer: newFooter } : null),
        };

        return newScreen;
    }
}

export default ShareCall;
