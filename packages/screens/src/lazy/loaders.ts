/**
 * The loaders of the screens of @micromag/screens: each screen package is a chunk of its own, with
 * its component and its CSS
 */
import type { ElementType } from 'react';

type ScreenLoader = () => Promise<ElementType>;

const loadArticle = () =>
    Promise.all([
        import(/* webpackChunkName: "screen-article" */ '@micromag/screen-article/component'),
        import(
            /* webpackChunkName: "screen-article" */ '@micromag/screen-article/assets/css/styles.css'
        ),
    ]).then(([module]) => module);
const loadAudio = () =>
    Promise.all([
        import(/* webpackChunkName: "screen-audio" */ '@micromag/screen-audio/component'),
        import(
            /* webpackChunkName: "screen-audio" */ '@micromag/screen-audio/assets/css/styles.css'
        ),
    ]).then(([module]) => module);
const loadContribution = () =>
    Promise.all([
        import(
            /* webpackChunkName: "screen-contribution" */ '@micromag/screen-contribution/component'
        ),
        import(
            /* webpackChunkName: "screen-contribution" */ '@micromag/screen-contribution/assets/css/styles.css'
        ),
    ]).then(([module]) => module);
const loadConversation = () =>
    Promise.all([
        import(
            /* webpackChunkName: "screen-conversation" */ '@micromag/screen-conversation/component'
        ),
        import(
            /* webpackChunkName: "screen-conversation" */ '@micromag/screen-conversation/assets/css/styles.css'
        ),
    ]).then(([module]) => module);
const loadGallery = () =>
    Promise.all([
        import(/* webpackChunkName: "screen-gallery" */ '@micromag/screen-gallery/component'),
        import(
            /* webpackChunkName: "screen-gallery" */ '@micromag/screen-gallery/assets/css/styles.css'
        ),
    ]).then(([module]) => module);
const loadGalleryFeed = () =>
    Promise.all([
        import(
            /* webpackChunkName: "screen-gallery-feed" */ '@micromag/screen-gallery-feed/component'
        ),
        import(
            /* webpackChunkName: "screen-gallery-feed" */ '@micromag/screen-gallery-feed/assets/css/styles.css'
        ),
    ]).then(([module]) => module);
const loadGameSort = () =>
    Promise.all([
        import(/* webpackChunkName: "screen-game-sort" */ '@micromag/screen-game-sort/component'),
        import(
            /* webpackChunkName: "screen-game-sort" */ '@micromag/screen-game-sort/assets/css/styles.css'
        ),
    ]).then(([module]) => module);
const loadImage = () =>
    Promise.all([
        import(/* webpackChunkName: "screen-image" */ '@micromag/screen-image/component'),
        import(
            /* webpackChunkName: "screen-image" */ '@micromag/screen-image/assets/css/styles.css'
        ),
    ]).then(([module]) => module);
const loadKeypad = () =>
    Promise.all([
        import(/* webpackChunkName: "screen-keypad" */ '@micromag/screen-keypad/component'),
        import(
            /* webpackChunkName: "screen-keypad" */ '@micromag/screen-keypad/assets/css/styles.css'
        ),
    ]).then(([module]) => module);
const loadMap = () =>
    Promise.all([
        import(/* webpackChunkName: "screen-map" */ '@micromag/screen-map/component'),
        import(/* webpackChunkName: "screen-map" */ '@micromag/screen-map/assets/css/styles.css'),
    ]).then(([module]) => module);
const loadQuiz = () =>
    Promise.all([
        import(/* webpackChunkName: "screen-quiz" */ '@micromag/screen-quiz/component'),
        import(/* webpackChunkName: "screen-quiz" */ '@micromag/screen-quiz/assets/css/styles.css'),
    ]).then(([module]) => module);
const loadQuote = () =>
    Promise.all([
        import(/* webpackChunkName: "screen-quote" */ '@micromag/screen-quote/component'),
        import(
            /* webpackChunkName: "screen-quote" */ '@micromag/screen-quote/assets/css/styles.css'
        ),
    ]).then(([module]) => module);
const loadRanking = () =>
    Promise.all([
        import(/* webpackChunkName: "screen-ranking" */ '@micromag/screen-ranking/component'),
        import(
            /* webpackChunkName: "screen-ranking" */ '@micromag/screen-ranking/assets/css/styles.css'
        ),
    ]).then(([module]) => module);
const loadShare = () =>
    Promise.all([
        import(/* webpackChunkName: "screen-share" */ '@micromag/screen-share/component'),
        import(
            /* webpackChunkName: "screen-share" */ '@micromag/screen-share/assets/css/styles.css'
        ),
    ]).then(([module]) => module);
const loadSlideshow = () =>
    Promise.all([
        import(/* webpackChunkName: "screen-slideshow" */ '@micromag/screen-slideshow/component'),
        import(
            /* webpackChunkName: "screen-slideshow" */ '@micromag/screen-slideshow/assets/css/styles.css'
        ),
    ]).then(([module]) => module);
const loadSurvey = () =>
    Promise.all([
        import(/* webpackChunkName: "screen-survey" */ '@micromag/screen-survey/component'),
        import(
            /* webpackChunkName: "screen-survey" */ '@micromag/screen-survey/assets/css/styles.css'
        ),
    ]).then(([module]) => module);
const loadText = () =>
    Promise.all([
        import(/* webpackChunkName: "screen-text" */ '@micromag/screen-text/component'),
        import(/* webpackChunkName: "screen-text" */ '@micromag/screen-text/assets/css/styles.css'),
    ]).then(([module]) => module);
const loadTimeline = () =>
    Promise.all([
        import(/* webpackChunkName: "screen-timeline" */ '@micromag/screen-timeline/component'),
        import(
            /* webpackChunkName: "screen-timeline" */ '@micromag/screen-timeline/assets/css/styles.css'
        ),
    ]).then(([module]) => module);
const loadTitle = () =>
    Promise.all([
        import(/* webpackChunkName: "screen-title" */ '@micromag/screen-title/component'),
        import(
            /* webpackChunkName: "screen-title" */ '@micromag/screen-title/assets/css/styles.css'
        ),
    ]).then(([module]) => module);
const loadUrbaniaArticle = () =>
    Promise.all([
        import(
            /* webpackChunkName: "screen-urbania-article" */ '@micromag/screen-urbania-article/component'
        ),
        import(
            /* webpackChunkName: "screen-urbania-article" */ '@micromag/screen-urbania-article/assets/css/styles.css'
        ),
    ]).then(([module]) => module);
const loadUrbaniaHoroscope = () =>
    Promise.all([
        import(
            /* webpackChunkName: "screen-urbania-horoscope" */ '@micromag/screen-urbania-horoscope/component'
        ),
        import(
            /* webpackChunkName: "screen-urbania-horoscope" */ '@micromag/screen-urbania-horoscope/assets/css/styles.css'
        ),
    ]).then(([module]) => module);
const loadUrbaniaRecommendation = () =>
    Promise.all([
        import(
            /* webpackChunkName: "screen-urbania-recommendation" */ '@micromag/screen-urbania-recommendation/component'
        ),
        import(
            /* webpackChunkName: "screen-urbania-recommendation" */ '@micromag/screen-urbania-recommendation/assets/css/styles.css'
        ),
    ]).then(([module]) => module);
const loadUrbaniaTrivia = () =>
    Promise.all([
        import(
            /* webpackChunkName: "screen-urbania-trivia" */ '@micromag/screen-urbania-trivia/component'
        ),
        import(
            /* webpackChunkName: "screen-urbania-trivia" */ '@micromag/screen-urbania-trivia/assets/css/styles.css'
        ),
    ]).then(([module]) => module);
const loadVideo = () =>
    Promise.all([
        import(/* webpackChunkName: "screen-video" */ '@micromag/screen-video/component'),
        import(
            /* webpackChunkName: "screen-video" */ '@micromag/screen-video/assets/css/styles.css'
        ),
    ]).then(([module]) => module);
const loadVideo360 = () =>
    Promise.all([
        import(/* webpackChunkName: "screen-video-360" */ '@micromag/screen-video-360/component'),
        import(
            /* webpackChunkName: "screen-video-360" */ '@micromag/screen-video-360/assets/css/styles.css'
        ),
    ]).then(([module]) => module);

const loaders: Record<string, ScreenLoader> = {
    article: () => loadArticle().then(({ ArticleScreen }) => ArticleScreen),
    audio: () => loadAudio().then(({ AudioScreen }) => AudioScreen),
    contribution: () => loadContribution().then(({ ContributionScreen }) => ContributionScreen),
    conversation: () => loadConversation().then(({ ConversationScreen }) => ConversationScreen),
    gallery: () => loadGallery().then(({ GalleryScreen }) => GalleryScreen),
    'gallery-captions': () =>
        loadGallery().then(({ GalleryCaptionsScreen }) => GalleryCaptionsScreen),
    'gallery-feed': () => loadGalleryFeed().then(({ GalleryFeedScreen }) => GalleryFeedScreen),
    'gallery-feed-captions': () =>
        loadGalleryFeed().then(({ GalleryFeedCaptionsScreen }) => GalleryFeedCaptionsScreen),
    'game-sort': () => loadGameSort().then(({ GameSortScreen }) => GameSortScreen),
    image: () => loadImage().then(({ ImageScreen }) => ImageScreen),
    'image-title': () => loadImage().then(({ ImageTitleScreen }) => ImageTitleScreen),
    'image-text': () => loadImage().then(({ ImageTextScreen }) => ImageTextScreen),
    'image-title-text': () => loadImage().then(({ ImageTitleTextScreen }) => ImageTitleTextScreen),
    'image-legend': () => loadImage().then(({ ImageLegendScreen }) => ImageLegendScreen),
    keypad: () => loadKeypad().then(({ Keypad }) => Keypad),
    map: () => loadMap().then(({ MapScreen }) => MapScreen),
    'map-images': () => loadMap().then(({ MapImagesScreen }) => MapImagesScreen),
    quiz: () => loadQuiz().then(({ QuizScreen }) => QuizScreen),
    'quiz-multiple': () => loadQuiz().then(({ QuizMultipleScreen }) => QuizMultipleScreen),
    quote: () => loadQuote().then(({ QuoteScreen }) => QuoteScreen),
    ranking: () => loadRanking().then(({ RankingScreen }) => RankingScreen),
    share: () => loadShare().then(({ ShareScreen }) => ShareScreen),
    slideshow: () => loadSlideshow().then(({ SlideshowScreen }) => SlideshowScreen),
    survey: () => loadSurvey().then(({ SurveyScreen }) => SurveyScreen),
    text: () => loadText().then(({ TextScreen }) => TextScreen),
    'text-title': () => loadText().then(({ TextTitleScreen }) => TextTitleScreen),
    timeline: () => loadTimeline().then(({ TimelineScreen }) => TimelineScreen),
    'timeline-illustrated': () =>
        loadTimeline().then(({ TimelineIllustratedScreen }) => TimelineIllustratedScreen),
    title: () => loadTitle().then(({ TitleScreen }) => TitleScreen),
    'title-subtitle': () => loadTitle().then(({ TitleSubtitleScreen }) => TitleSubtitleScreen),
    'title-subtitle-credits': () =>
        loadTitle().then(({ TitleSubtitleCreditsScreen }) => TitleSubtitleCreditsScreen),
    'title-with-box': () => loadTitle().then(({ TitleWithBoxScreen }) => TitleWithBoxScreen),
    'urbania-article': () => loadUrbaniaArticle().then(({ UrbaniaArticle }) => UrbaniaArticle),
    'urbania-article-card': () =>
        loadUrbaniaArticle().then(({ UrbaniaArticleCard }) => UrbaniaArticleCard),
    'urbania-horoscope': () =>
        loadUrbaniaHoroscope().then(({ UrbaniaHoroscope }) => UrbaniaHoroscope),
    'urbania-recommendation': () =>
        loadUrbaniaRecommendation().then(({ UrbaniaRecommendation }) => UrbaniaRecommendation),
    'urbania-trivia': () =>
        loadUrbaniaTrivia().then(({ UrbaniaTriviaScreen }) => UrbaniaTriviaScreen),
    video: () => loadVideo().then(({ VideoScreen }) => VideoScreen),
    'video-360': () => loadVideo360().then(({ Video360Screen }) => Video360Screen),
};

export default loaders;
