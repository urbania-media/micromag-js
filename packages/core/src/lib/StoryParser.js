import FontsParser from './FontsParser';
import MediasParser from './MediasParser';
import MigrationsParser from './MigrationsParser';
import ThemeParser from './ThemeParser';

class StoryParser {
    constructor({ screensManager, fieldsManager }) {
        this.themeParser = new ThemeParser({ screensManager });
        this.mediasParser = new MediasParser({ screensManager, fieldsManager });
        this.fontsParser = new FontsParser({ screensManager, fieldsManager });
        this.migrationsParser = new MigrationsParser({ screensManager });
    }

    parse(
        story,
        { withTheme = true, withMedias = true, withFonts = true, withMigrations = true } = {},
    ) {
        if (story === null) {
            return story;
        }
        const parsers = [
            [withMedias, (newStory) => this.mediasParser.fromPath(newStory)],
            [withTheme, (newStory) => this.themeParser.parse(newStory)],
            [withFonts, (newStory) => this.fontsParser.parse(newStory)],
            [withMigrations, (newStory) => this.migrationsParser.parse(newStory)],
        ];
        return parsers.reduce(
            (parsedStory, [enabled, parse]) => (enabled ? parse(parsedStory) : parsedStory),
            story,
        );
    }
}

export default StoryParser;
