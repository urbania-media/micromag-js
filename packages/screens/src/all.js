import { ScreensManager } from '@micromag/core';

import ad from '@micromag/screen-ad';
import audio from '@micromag/screen-audio';
import gallery from '@micromag/screen-gallery';
import galleryFeed from '@micromag/screen-gallery-feed';
import image from '@micromag/screen-image';
import map from '@micromag/screen-map';
import quote from '@micromag/screen-quote';
import slideshow from '@micromag/screen-slideshow';
import quiz from '@micromag/screen-quiz';
import text from '@micromag/screen-text';
import timeline from '@micromag/screen-timeline';
import title from '@micromag/screen-title';
import video from '@micromag/screen-video';

const manager = new ScreensManager();
manager.addDefinition(ad);
manager.addDefinition(audio);
manager.addDefinition(gallery);
manager.addDefinition(galleryFeed);
manager.addDefinition(image);
manager.addDefinition(map);
manager.addDefinition(quiz);
manager.addDefinition(quote);
manager.addDefinition(slideshow);
manager.addDefinition(text);
manager.addDefinition(timeline);
manager.addDefinition(title);
manager.addDefinition(video);

export default manager;
