// organize-imports-ignore
import React from 'react';
import { createRoot } from 'react-dom/client';

// The screens are loaded on demand: each screen type of the story (component and CSS) is a chunk
// of its own, loaded when the viewer mounts
import '@micromag/viewer/assets/css/lazy.css';
import Viewer from '@micromag/viewer/lazy';

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

const roots = new WeakMap();

const renderStory = (story, props = {}, rootElement = defaultRootElement) => {
    let root = roots.get(rootElement);
    if (!root) {
        root = createRoot(rootElement);
        roots.set(rootElement, root);
    }
    root.render(
        React.createElement(Viewer, {
            ...props,
            story,
        }),
    );
};

if (initialStory !== null) {
    renderStory(initialStory, initialProps);
}

if (renderStoryFnc !== null) {
    window[renderStoryFnc] = renderStory;
}
