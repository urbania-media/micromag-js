import React from 'react';

import ReactDOMServer from 'react-dom/server';
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
    return ReactDOMServer.renderToStaticMarkup(element);
};
export default getStoryHtmlSSR;
