/* eslint-disable no-await-in-loop */
/* globals renderStory: true */
import path from 'path';
import puppeteer from 'puppeteer';

import startServer from './startServer';
import getOutputPath from './getOutputPath';

const DEBUG = false;
const READY_WAIT_TIMEOUT = 20000; // ms
const DEFAULT_VIEWPORT = {
    width: 360,
    height: 640,
    deviceScaleFactor: 3,
    isMobile: true,
};

const captureStory = async (story, location, settings = {}) => {
    const {
        viewport: defaultViewport = DEFAULT_VIEWPORT,
        googleApiKey = null,
        executablePath = null,
    } = settings;
    const server = await startServer(
        path.join(process.cwd(), './node_modules/@micromag/viewer-build/build/'),
    );
    const serverPort = server.address().port;
    const { width, height } = defaultViewport;

    const browser = await puppeteer.launch({
        devtools: DEBUG,
        ...(executablePath !== null ? { executablePath } : null),
        defaultViewport,
    });

    const pages = await browser.pages();
    const hasPage = pages.length > 0;
    const page = hasPage ? pages[0] : await browser.newPage();
    await page.goto(`http://127.0.0.1:${serverPort}`);

    const { components: screens = null } = story || {};
    if (screens !== null) {
        const count = screens.length;
        for (let index = 0; index < count; index += 1) {
            const { id, type } = screens[index];
            const singleScreenStory = { ...story, components: screens.slice(index, index + 1) };
            console.log(`Screen ${index + 1}/${count} (${type})...`);
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
                    googleApiKey,
                },
            );

            try {
                await page.waitForSelector('[data-screen-ready="true"]', {
                    timeout: READY_WAIT_TIMEOUT,
                });
            } catch (e) {
                console.log(`Timeout reached: ${id}`);
            }

            await page.screenshot({
                path: getOutputPath(location, `${index}_${id}.png`),
            });
        }
    }

    await browser.close();
    server.close();
};

export default captureStory;
