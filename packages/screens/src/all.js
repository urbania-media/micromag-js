// export { default as Ad } from '@micromag/screen-ad';
// export { default as Audio } from '@micromag/screen-audio';
// export { default as Gallery } from '@micromag/screen-gallery';
// export { default as GalleryFeed } from '@micromag/screen-gallery-feed';
// export { default as Image } from '@micromag/screen-image';
// export { default as Map } from '@micromag/screen-map';
// export { default as MapPath } from '@micromag/screen-map-path';
// export { default as Quote } from '@micromag/screen-quote';
// export { default as Slideshow } from '@micromag/screen-slideshow';
// export { default as SurveyCheckbox } from '@micromag/screen-survey-checkbox';
// export { default as SurveyMultipleChoice } from '@micromag/screen-survey-multiple-choice';
// export { default as SurveyYesNo } from '@micromag/screen-survey-yes-no';
// export { default as Text } from '@micromag/screen-text';
// export { default as TextImage } from '@micromag/screen-text-image';
// export { default as TimelineCentered } from '@micromag/screen-timeline-centered';
import text from '@micromag/screen-text';
import textImage from '@micromag/screen-text-image';
import timelineCentered from '@micromag/screen-timeline-centered';
import title from '@micromag/screen-title';
import video from '@micromag/screen-video';

const screens = [
    text,
    textImage,
    timelineCentered,
    title,
    ...video,
];

export default screens;
