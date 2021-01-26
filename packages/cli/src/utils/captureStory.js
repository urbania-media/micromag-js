/* eslint-disable no-await-in-loop */
/* globals renderStory: true */
import path from 'path';
import puppeteer from 'puppeteer';

import startServer from './startServer';
import getOutputPath from './getOutputPath';

const captureStory = async (story, location, width = 320, height = 640) => {
    const server = await startServer(
        path.join(process.cwd(), './node_modules/@micromag/viewer-build/build/'),
    );
    const browser = await puppeteer.launch({
        devtools: true,
        defaultViewport: {
            width,
            height,
            deviceScaleFactor: 2,
            isMobile: true,
        },
    });
    const page = await browser.newPage();
    await page.goto(`http://127.0.0.1:3003`);

    const { components: screens = null } = story || {};
    if (screens !== null) {
        const count = screens.length;
        for (let index = 0; index < count; index += 1) {
            const { id, type } = screens[index];
            const singleScreenStory = {...story, components: screens.slice(index, index + 1)};
            console.log(`Rendering ${index+1}/${count} (${type})...`)
            await page.evaluate(
                (storyToRender, storyProps) => renderStory(storyToRender, storyProps),
                singleScreenStory,
                {
                    screen: id,
                    renderContext: 'capture',
                    withoutRouter: true,
                    withoutMenu: true,
                    width,
                    height,
                },
            );

            const screenReadyAttribute = 'data-screen-ready';
            try {
                await page.waitForSelector(`[${screenReadyAttribute}="true"]`, { timeout: 10000 });
                await page.waitForTimeout(500);
            } catch(e) {
                console.log('Timeout reached.');
            }
            
            await page.screenshot({
                path: getOutputPath(location, `${index}_${id}.png`),
            });
        }
    }

    await browser.close();
    server.close();
    console.log('Success');
};

export default captureStory;
