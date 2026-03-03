import { getJSON } from '@folklore/fetch';
import React from 'react';
import { createRoot } from 'react-dom/client';

import Viewer from '@micromag/viewer';
import '@micromag/viewer/assets/css/styles.css';

const storyUrl = 'https://microm.ag/poignees-d-amour.json';

const root = createRoot(document.getElementById('root'));

function renderStory(story, props = {}) {
    root.render(
        <Viewer
            className="micromag"
            story={story}
            withoutShareMenu
            withoutScreensMenu
            withoutNavigationArrow
            withNavigationHint
            {...props}
        />,
    );
}

async function loadStory(url) {
    const story = await getJSON(url);
    return story;
}

loadStory(storyUrl).then((story) => {
    renderStory(story, {});
});
