/* globals renderStory: true */
import path from 'path';
import puppeteer from 'puppeteer';

import startServer from './startServer';

const getStoryHtml = async (story, keys = null) => {
    const server = await startServer(
        path.join(process.cwd(), './node_modules/@micromag/viewer-build/build/'),
    );
    const serverPort = server.address().port;
    const { gmaps = null } = keys || {};

    const browser = await puppeteer.launch({
        devtools: true,
        defaultViewport: {
            width: 320,
            height: 640,
            deviceScaleFactor: 2,
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
            gmapsApiKey: gmaps,
        },
    );
    const pageContent = await page.content();
    await browser.close();
    server.close();
    return pageContent;
};

export default getStoryHtml;
