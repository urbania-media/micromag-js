import screensManager from '@micromag/screens';
import {
  camelCase,
} from "change-case";

const exportStory = (story, formatName) => {
    const { components = [] } = story;
    return components.reduce((newStory, screen) => {
        const { formats = {} } = screensManager.getDefinition(screen.type);
        const formatKey = camelCase(formatName);
        const format = formats[formatKey] || null;
        if (format !== null) {
            return format(newStory, screen, story);
        }
        return newStory;
    }, {});
};

export default exportStory;
