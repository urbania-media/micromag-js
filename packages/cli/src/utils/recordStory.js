/* eslint-disable no-await-in-loop */
/* globals renderStory: true */
import path from 'path';
import puppeteer from 'puppeteer';
import fsExtra from 'fs-extra';
import nodeFetch from 'node-fetch';

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

    const { components: screens = null } = story || {};

    const browser = await puppeteer.launch({
        devtools: DEBUG,
        ...(executablePath !== null ? { executablePath } : null),
        defaultViewport,
        args: ['--no-sandbox'],
    });

    // try {
    const pages = await browser.pages();
    const hasPage = pages.length > 0;
    const page = hasPage ? pages[0] : await browser.newPage();
    await page.goto(`http://127.0.0.1:${serverPort}`);

    if (screens !== null) {
        const count = screens.length;
        for (let index = 0; index < count; index += 1) {
            const screenNumber = index + 1;
            const screen = screens[index];
            const { id, type } = screen;
            const singleScreenStory = { ...story, components: screens.slice(index, index + 1) };
            console.log(`Screen ${screenNumber}/${count} (${type})...`);

            if (type === 'video' || type === 'video-360') {
                const { video: { media: { url = null } = {} } = {} } = screen;
                console.log(`Downloading video from ${url}...`);
                const fileExtension = url.split(/[#?]/)[0].split('.').pop().trim();
                const res = await nodeFetch(url);
                const fileStream = fsExtra.createWriteStream(
                    getOutputPath(location, `${screenNumber}.${fileExtension}`),
                );
                await new Promise((resolve, reject) => {
                    res.body.pipe(fileStream);
                    res.body.on('error', reject);
                    fileStream.on('finish', resolve);
                });
            }

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
                path: getOutputPath(location, `${screenNumber}.png`),
            });
        }
    }
    // } catch (e) {
    //     console.log('ERROR', e); // eslint-disable-line
    // }

    await browser.close();
    server.close();
};

export default captureStory;
