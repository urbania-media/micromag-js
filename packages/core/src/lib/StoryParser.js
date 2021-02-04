import ThemeParser from './ThemeParser';
import MediasParser from './MediasParser';
import FontsParser from './FontsParser';

class StoryParser {
    constructor({ screensManager, fieldsManager }) {
        this.themeParser = new ThemeParser({ screensManager });
        this.mediasParser = new MediasParser({ screensManager, fieldsManager });
        this.fontsParser = new FontsParser({ screensManager, fieldsManager });
    }

    parse(story, { withTheme = true, withMedias = true, withFonts = true } = {}) {
        if (story === null) {
            return story;
        }
        const parsers = [
            [withMedias, (newStory) => this.mediasParser.fromPath(newStory)],
            [withTheme, (newStory) => this.themeParser.parse(newStory)],
            [withFonts, (newStory) => this.fontsParser.parse(newStory)],
        ];
        return parsers.reduce(
            (parsedStory, [enabled, parse]) => (enabled ? parse(parsedStory) : parsedStory),
            story,
        );
    }
}

export default StoryParser;
