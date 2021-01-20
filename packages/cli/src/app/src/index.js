import React from 'react';
import { render } from 'react-dom';
import Viewer from '@micromag/viewer';
import '@micromag/viewer/scss/styles.scss';
import './index.css';

function renderStory(story) {
    render(
        React.createElement(Viewer, {
            story,
        }),
        document.getElementById('root'),
    );
}

window.renderStory = renderStory;
