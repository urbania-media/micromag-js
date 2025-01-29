import * as migrations from './migrations/index';

class MigrationsParser {
    constructor({ screensManager }) {
        this.screensManager = screensManager;
        this.parsers = Object.keys(migrations).map((migration) => new migrations[migration]());
    }

    // eslint-disable-next-line class-methods-use-this
    parse(story) {
        if (story === null) {
            return story;
        }
        const { components = [], ...restStory } = story || {};
        const finalComponents = components.reduce((currentComponents, screen) => {
            const newScreen = this.parsers.reduce((currentScreen, parser) => {
                if (parser.test(currentScreen)) {
                    return parser.parse(currentScreen);
                }
                return currentScreen;
            }, screen);
            return [...currentComponents, newScreen];
        }, []);

        return {
            ...restStory,
            components: finalComponents,
        };
    }
}

export default MigrationsParser;
