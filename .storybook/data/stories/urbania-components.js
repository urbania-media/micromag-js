import UrbaniaArticleCard from './urbania-article-card';
import UrbaniaHoroscope from './urbania-horoscope';
import UrbaniaRecommandations from './urbania-reco';
import UrbaniaTrivia from './urbania-trivia';

// import UrbaniaArticleVideo from './urbania-article-video.json';
import UrbaniaArticle from './urbania-article.json';

export default [
    { ...UrbaniaArticleCard, type: 'urbania-article-card' },
    { ...UrbaniaArticle, type: 'urbania-article' },
    // { ...UrbaniaArticleVideo, type: 'urbania-article-video' },
    { ...UrbaniaHoroscope, type: 'urbania-horoscope' },
    { ...UrbaniaRecommandations, type: 'urbania-recommendation' },
    { ...UrbaniaTrivia, type: 'urbania-trivia' },
];
