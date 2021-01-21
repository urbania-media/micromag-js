import screensManager from '@micromag/screens';
import { camelCase } from 'change-case';
import { transformer, postProcessor } from '@micromag/transforms';

const transformStory = (story, format) => {
    const transformKey = camelCase(format);

    const baseStory = transformer(story, transformKey);

    const { components = [] } = story;
    const componentsStory = components.reduce((newStory, screen) => {
        const { type } = screen;
        const { transforms = {} } = screensManager.getDefinition(type);
        const transform = transforms[transformKey] || null;
        if (transform !== null) {
            return transform(newStory, screen, story);
        }
        return newStory;
    }, baseStory);

    return postProcessor(componentsStory, transformKey);
};

export default transformStory;
