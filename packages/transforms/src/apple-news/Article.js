import getArticleComponents from './lib/getArticleComponents';
import getArticleTextStyles from './lib/getArticleTextStyles';
import getArticleLayouts from './lib/getArticleLayouts';
import getArticleDocumentStyle from './lib/getArticleDocumentStyle';
import ArticleDefinition from './definitions/ArticleDocument.json';

import { validate } from '../utils';

const Article = (story, settings) => {
    // console.log('ARTICLE', story); // eslint-disable-line

    const { title = 'Article' } = story;
    const { identifier = 'testArticle' } = settings || {};

    const content = {
        title,
        version: `${1}.0`.toString(), // Note: for some reason only 1.0 works
        identifier,
        language: 'fr',
        layout: {},
        documentStyle: {},
        components: [],
        componentStyles: {},
        componentTextStyles: {},
        componentLayouts: {},
        ...getArticleDocumentStyle(story),
        ...getArticleTextStyles(story),
        ...getArticleLayouts(story),
        ...getArticleComponents(story),
    };

    // console.log('KONTENT', content);

    return validate(content, ArticleDefinition);
};

export default Article;
