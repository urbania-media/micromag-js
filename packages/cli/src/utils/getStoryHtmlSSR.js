import React from 'react';
import fse from 'fs-extra';
import path from 'path';

import ReactDOMServer from 'react-dom/server';
import Viewer from '@micromag/viewer';

const getStoryHtmlSSR = (story) => {
    const element = React.createElement(Viewer, { ...{ memoryRouter: true }, story });
    const staticMarkup = ReactDOMServer.renderToStaticMarkup(element);
    fse.writeFile(path.join(process.cwd(), './story-ssr.html'), staticMarkup);
};
export default getStoryHtmlSSR;
