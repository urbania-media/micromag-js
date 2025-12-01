import React from 'react';

import { renderToStaticMarkup } from 'react-dom/server';
import Viewer from '@micromag/viewer';

const getStoryHtmlSSR = (story, settings = {}) => {
    const { googleApiKey = null } = settings;
    const element = React.createElement(Viewer, {
        story,
        renderContext: 'static',
        withoutRouter: true,
        withoutMenu: true,
        googleApiKey,
        memoryRouter: true,
    });
    return renderToStaticMarkup(element);
};
export default getStoryHtmlSSR;
