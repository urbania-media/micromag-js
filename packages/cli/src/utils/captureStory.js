/* globals renderStory: true */
import path from 'path';
import puppeteer from 'puppeteer';

import startServer from './startServer';

const captureStory = async (story, location) => {
    const server = await startServer(
        path.join(process.cwd(), './node_modules/@micromag/viewer-build/build/'),
    );
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
    // looper story components
    const { components = null } = story || {};
    if (components !== null) {
        components.forEach(async ({ id }) => {
            console.log(id)
            /*
            await page.evaluate(
                (storyToRender) =>
                    renderStory(storyToRender, {
                        screen: id,
                        renderContext: 'capture',
                        withoutRouter: true,
                        withoutMenu: true,
                    }),
                story,
            );
            await page.waitFor(3000);
            await page.screenshot({
                path: path.join(location, './screenshot.png'),
            });
            */
        });
    }

    await browser.close();
    server.close();
};

export default captureStory;
