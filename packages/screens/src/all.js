import isArray from 'lodash/isArray';

import ad from '@micromag/screen-ad';
import audio from '@micromag/screen-audio';
import contribution from '@micromag/screen-contribution';
import gallery from '@micromag/screen-gallery';
import galleryFeed from '@micromag/screen-gallery-feed';
import image from '@micromag/screen-image';
import map from '@micromag/screen-map';
import quiz from '@micromag/screen-quiz';
import quote from '@micromag/screen-quote';
import ranking from '@micromag/screen-ranking';
import slideshow from '@micromag/screen-slideshow';
import survey from '@micromag/screen-survey';
import text from '@micromag/screen-text';
import timeline from '@micromag/screen-timeline';
import title from '@micromag/screen-title';
import video from '@micromag/screen-video';

const screens = [
    ad,
    audio,
    contribution,
    gallery,
    galleryFeed,
    image,
    map,
    quiz,
    quote,
    ranking,
    slideshow,
    survey,    
    text,
    timeline,
    title,
    video,
].reduce((allScreens, screen) => [...allScreens, ...(isArray(screen) ? screen : [screen])], []);

export default screens;
