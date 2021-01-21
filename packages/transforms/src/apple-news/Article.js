import { validate } from '../utils';
import ArticleDefinition from './definitions/api/Article.json';

const Article = (newStory) => {
    console.log('ARTICLE', newStory); // eslint-disable-line
    const { title } = newStory;

    const content = {
        title,
        version: '1.0',
        identifier: 'testArticle',
        language: 'fr',
        layout: {
            columns: 12,
            width: 1024,
        },
        components: [],
        componentStyles: {},
    };

    return validate(content, ArticleDefinition) ? content : null;
};

export default Article;
