import { ScreensManager } from '@micromag/core';

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
import survey from '@micromag/screen-survey';
import text from '@micromag/screen-text';
import timeline from '@micromag/screen-timeline';
import title from '@micromag/screen-title';
import video from '@micromag/screen-video';

const manager = new ScreensManager();
manager.addDefinition(ad);
manager.addDefinition(audio);
manager.addDefinition(contribution);
manager.addDefinition(gallery);
manager.addDefinition(galleryFeed);
manager.addDefinition(image);
manager.addDefinition(map);
manager.addDefinition(quiz);
manager.addDefinition(quote);
manager.addDefinition(ranking);
manager.addDefinition(survey);
manager.addDefinition(text);
manager.addDefinition(timeline);
manager.addDefinition(title);
manager.addDefinition(video);

export default manager;
