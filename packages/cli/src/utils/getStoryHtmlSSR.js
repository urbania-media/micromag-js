import React from 'react';

import ReactDOMServer from 'react-dom/server';
import Viewer from '@micromag/viewer';

const getStoryHtmlSSR = (story) => {
    const element = React.createElement(Viewer, { ...{ memoryRouter: true }, story });
    const staticMarkup = ReactDOMServer.renderToStaticMarkup(element);
    return staticMarkup;
};
export default getStoryHtmlSSR;
