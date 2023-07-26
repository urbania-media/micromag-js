/* eslint-disable import/no-extraneous-dependencies */
// organize-imports-ignore
import React from 'react';
import { render } from 'react-dom';

import Viewer from '@micromag/viewer';
import '@micromag/viewer/scss/styles';

import './public-path';

import './index.css';

const initialStory = typeof window.MICROMAG_STORY !== 'undefined' ? window.MICROMAG_STORY : null;
const initialProps =
    typeof window.MICROMAG_VIEWER_PROPS !== 'undefined' ? window.MICROMAG_VIEWER_PROPS : null;
const rootElementId =
    typeof window.MICROMAG_ROOT_ELEMENT_ID !== 'undefined'
        ? window.MICROMAG_ROOT_ELEMENT_ID
        : 'root';
const defaultRootElement =
    typeof window.MICROMAG_ROOT_ELEMENT !== 'undefined'
        ? window.MICROMAG_ROOT_ELEMENT
        : document.getElementById(rootElementId);
const renderStoryFnc =
    typeof window.MICROMAG_RENDER_STORY_FNC !== 'undefined'
        ? window.MICROMAG_RENDER_STORY_FNC
        : 'renderStory';

const renderStory = (story, props = {}, root = defaultRootElement) => {
    render(
        React.createElement(Viewer, {
            ...props,
            story,
        }),
        root,
    );
};

if (initialStory !== null) {
    renderStory(initialStory, initialProps);
}

if (renderStoryFnc !== null) {
    window[renderStoryFnc] = renderStory;
}
