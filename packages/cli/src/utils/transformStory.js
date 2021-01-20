import screensManager from '@micromag/screens';
import {
  camelCase,
} from "change-case";

const transformStory = (story, format) => {
    const transformKey = camelCase(format);
    const { components = [] } = story;
    return components.reduce((newStory, screen) => {
        const { type } = screen;
        const { transforms = {} } = screensManager.getDefinition(type);
        const transform = transforms[transformKey] || null;
        if (transform !== null) {
            return transform(newStory, screen, story);
        }
        return newStory;
    }, {});
};

export default transformStory;
