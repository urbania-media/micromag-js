import UrbaniaArticleCard from './urbania-article-card';
import UrbaniaHoroscope from './urbania-horoscope';
import UrbaniaRecommandations from './urbania-reco';
import UrbaniaTrivia from './urbania-trivia';

// import UrbaniaArticleVideo from './urbania-article-video.json';
import UrbaniaArticle from './urbania-article.json';

export default [
    { ...UrbaniaHoroscope, type: 'urbania-horoscope' },
    { ...UrbaniaArticleCard, type: 'urbania-article-card' },
    { ...UrbaniaArticle, type: 'urbania-article' },
    // { ...UrbaniaArticleVideo, type: 'urbania-article-video' },
    { ...UrbaniaRecommandations, type: 'urbania-recommendation' },
    { ...UrbaniaTrivia, type: 'urbania-trivia' },
];
