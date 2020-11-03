import ad from '@micromag/screen-ad';
import audio from '@micromag/screen-audio';
import gallery from '@micromag/screen-gallery';
import galleryFeed from '@micromag/screen-gallery-feed';
import image from '@micromag/screen-image';
import map from '@micromag/screen-map';
import mapPath from '@micromag/screen-map-path';
import quote from '@micromag/screen-quote';
import slideshow from '@micromag/screen-slideshow';
import quiz from '@micromag/screen-quiz';
import text from '@micromag/screen-text';
import timeline from '@micromag/screen-timeline';
import title from '@micromag/screen-title';
import video from '@micromag/screen-video';

const screens = [
    ad,
    audio,
    ...gallery,
    ...galleryFeed,
    ...image,
    ...map,
    mapPath,
    quote,
    slideshow,
    quiz,
    ...text,
    ...timeline,
    ...title,
    ...video,
];

export default screens;
