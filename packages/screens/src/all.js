import { ScreensManager } from '@micromag/core';

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
import video360 from '@micromag/screen-video-360';

const manager = new ScreensManager();
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
manager.addDefinition(video360);

export default manager;
