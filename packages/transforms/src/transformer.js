import { Article } from './apple-news';

const transformer = (story, type) => {
    if (type === 'appleNews') {
        return Article(story);
    }
    return story;
};

export default transformer;
