import { ScreenComponent, Story, StoryParser } from '../types';
import ScreensManager from './ScreensManager';
import * as migrations from './migrations/index';

class MigrationsParser implements StoryParser {
    screensManager: ScreensManager;
    parsers: {
        parse: (screen: ScreenComponent, story: Story) => ScreenComponent;
        test: (screen: ScreenComponent, story: Story) => boolean;
        priority?: number;
    }[];

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

    parseToViewer(story: Story) {
        if (story === null) {
            return story;
        }
        const { components = [], ...restStory } = story || {};
        const finalComponents = components.reduce((currentComponents, screen) => {
            const newScreen = this.parsers.reduce((currentScreen, parser) => {
                if (parser.test(currentScreen, story)) {
                    return parser.parse(currentScreen, story);
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
