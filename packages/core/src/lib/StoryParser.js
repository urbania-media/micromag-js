import ThemeParser from './ThemeParser';
import MediasParser from './MediasParser';

class StoryParser {
    constructor({ screensManager, fieldsManager }) {
        this.themeParser = new ThemeParser({ screensManager });
        this.mediasParser = new MediasParser({ screensManager, fieldsManager });
    }

    parse(story, { withTheme = true, withMedias = true } = {}) {
        if (story === null) {
            return story;
        }
        const parsers = [
            [withMedias, (newStory) => this.mediasParser.fromPath(newStory)],
            [withTheme, (newStory) => this.themeParser.parse(newStory)],
        ];
        return parsers.reduce(
            (parsedStory, [enabled, parse]) => (enabled ? parse(parsedStory) : parsedStory),
            story,
        );
    }
}

export default StoryParser;
