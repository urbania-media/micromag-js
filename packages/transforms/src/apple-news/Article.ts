import { validate } from '../utils';
import getArticleComponents from './lib/getArticleComponents';
import getArticleDocumentStyle from './lib/getArticleDocumentStyle';
import getArticleLayouts from './lib/getArticleLayouts';
import getArticleTextStyles from './lib/getArticleTextStyles';

import ArticleDefinition from './definitions/ArticleDocument.json';

const Article = (story, settings) => {
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

    return validate(content, ArticleDefinition);
};

export default Article;
