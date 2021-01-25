import { Article } from './apple-news';

const transformer = (newStory, type, story) => {
    if (type === 'appleNews') {
        return Article(newStory, story);
    }
    return newStory;
};

export default transformer;
