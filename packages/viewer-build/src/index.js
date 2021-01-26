import React from 'react';
import { render } from 'react-dom';
import Viewer from '@micromag/viewer';
import '@micromag/viewer/scss/styles.scss';
import './index.css';

function renderStory(story, props = {}) {
    render(
        React.createElement(Viewer, {
            ...(typeof window.MICROMAG_VIEWER_PROPS !== 'undefined'
                ? window.MICROMAG_VIEWER_PROPS
                : null),
            ...props,
            story,
        }),
        document.getElementById('root'),
    );
}

if (typeof window.MICROMAG_STORY !== 'undefined') {
    renderStory(window.MICROMAG_STORY);
} else {
    window.renderStory = renderStory;
}
