class MigrationsParser {
    constructor({ fieldsManager, screensManager }) {
        this.fieldsManager = fieldsManager;
        this.screensManager = screensManager;
    }

    // eslint-disable-next-line class-methods-use-this
    parse(story) {
        if (story === null) {
            return story;
        }

        const { components = [], ...restStory } = story || {};
        const finalComponents = components.reduce((currentComponents, screen) => {
            const { shareIncentive = null, callToAction = null, ...restScreen } = screen || {};

            if (shareIncentive === null && callToAction === null) {
                return [...currentComponents, restScreen];
            }

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
            return [...currentComponents, newScreen];
        }, []);

        return {
            ...restStory,
            components: finalComponents,
        };
    }
}

export default MigrationsParser;
