import React from 'react';

import ReactDOMServer from 'react-dom/server';
import Viewer from '@micromag/viewer';

const getStoryHtmlSSR = (story, keys = null) => {
    const { gmaps = null } = keys || {};
    const element = React.createElement(Viewer, {
        story,
        renderContext: 'static',
        withoutRouter: true,
        withoutMenu: true,
        gmapsApiKey: gmaps,
        memoryRouter: true,
    });
    return ReactDOMServer.renderToStaticMarkup(element);
};
export default getStoryHtmlSSR;
