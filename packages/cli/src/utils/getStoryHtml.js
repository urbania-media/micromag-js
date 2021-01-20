/* globals renderStory: true */
import path from 'path';
import fse from 'fs-extra';
import puppeteer from 'puppeteer';

import startServer from './startServer';

const getStoryHtml = async (story) => {
    const server = await startServer(path.join(process.cwd(), './public/'));
    const browser = await puppeteer.launch({
        devtools: true,
        defaultViewport: {
            width: 320,
            height: 640,
            deviceScaleFactor: 2,
            isMobile: true,
        },
    });
    const page = await browser.newPage();
    await page.goto(`http://127.0.0.1:3003`);
    await page.evaluate(storyToRender => renderStory(storyToRender), story);
    const pageContent = await page.content();
    fse.writeFile(path.join(process.cwd(), './story.html'), pageContent);
    await browser.close();
    server.close();
};

export default getStoryHtml;
