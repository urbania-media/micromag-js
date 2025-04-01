import * as migrations from './migrations/index';

class MigrationsParser {
    constructor({ screensManager }) {
        this.screensManager = screensManager;
        this.parsers = Object.keys(migrations).map((migration) => new migrations[migration]());
        this.parsers.sort((a, b) => {
            if (a.priority === undefined || b.priority === undefined) {
                return 0;
            }
            if (a.priority === b.priority) {
                return 0;
            }
            return a.priority < b.priority ? -1 : 1;
        });
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
