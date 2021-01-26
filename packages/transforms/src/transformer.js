import { Article } from './apple-news';

const transformer = (story, type, settings) => {
    if (type === 'appleNews') {
        return Article(story, settings);
    }
    return story;
};

export default transformer;
