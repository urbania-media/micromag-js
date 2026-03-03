import { backgroundVideo } from '../../data';
import UrbaniaArticleCard from './urbania-article-card';
import UrbaniaHoroscope from './urbania-horoscope';
import UrbaniaRecommandations from './urbania-reco';
import UrbaniaTrivia from './urbania-trivia';

// import UrbaniaArticleVideo from './urbania-article-video.json';
import UrbaniaArticle from './urbania-article.json';

export default [
    { ...UrbaniaRecommandations, type: 'urbania-recommendation' },
    { ...UrbaniaHoroscope, type: 'urbania-horoscope' },
    { ...UrbaniaArticleCard, type: 'urbania-article-card', background: backgroundVideo() },
    { ...UrbaniaArticle, type: 'urbania-article' },
    // { ...UrbaniaArticleVideo, type: 'urbania-article-video' },
    { ...UrbaniaTrivia, type: 'urbania-trivia' },
];
