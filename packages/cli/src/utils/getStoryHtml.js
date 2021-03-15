/* globals renderStory: true */
import path from 'path';
import puppeteer from 'puppeteer';

import startServer from './startServer';

const getStoryHtml = async (story, settings = {}) => {
    const { googleApiKey = null, executablePath = null } = settings;
    const server = await startServer(
        path.join(process.cwd(), './node_modules/@micromag/viewer-build/build/'),
    );
    const serverPort = server.address().port;

    const browser = await puppeteer.launch({
        devtools: false,
        ...(executablePath !== null ? { executablePath } : null),
        defaultViewport: {
            width: 360,
            height: 640,
            deviceScaleFactor: 3,
            isMobile: true,
        },
    });

    const pages = await browser.pages();
    const hasPage = pages.length > 0;
    const page = hasPage ? pages[0] : await browser.newPage();
    await page.goto(`http://127.0.0.1:${serverPort}`);

    await page.evaluate(
        (storyToRender, storyProps) => renderStory(storyToRender, storyProps),
        story,
        {
            renderContext: 'static',
            withoutRouter: true,
            withoutMenu: true,
            googleApiKey,
        },
    );
    const pageContent = await page.content();
    await browser.close();
    server.close();
    return pageContent;
};

export default getStoryHtml;
