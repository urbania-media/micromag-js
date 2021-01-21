import { validate } from '../utils';
import ArticleDefinition from './definitions/ArticleDocument.json';

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
            margin: 60,
            gutter: 20,
        },
        components: [],
        componentStyles: {},
        componentTextStyles: {},
    };

    return validate(content, ArticleDefinition);
};

export default Article;
