import { mergeStyles } from './apple-news';

const postProcessor = (story, type) => {
    if (type === 'appleNews') {
        return mergeStyles(story);
    }
    return story;
};

export default postProcessor;
