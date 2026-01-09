import path from 'path';
import puppeteer from 'puppeteer';
import { PuppeteerScreenRecorder } from 'puppeteer-screen-recorder';

import startServer from './lib/startServer';

async function wait(ms) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(), ms);
    });
}

async function startRecorder({ fileOutput = './exports/micromag.mp4' } = {}) {
    const server = await startServer(path.join(__dirname, '../build/'));
    const serverPort = server.address().port;
    console.log(`Server started at http://localhost:${serverPort}`);

    const browser = await puppeteer.launch({
        defaultViewport: {
            width: 540,
            height: 860,
            deviceScaleFactor: 2,
            isMobile: true,
        },
    });
    const page = await browser.newPage();
    const recorder = new PuppeteerScreenRecorder(page, {
        videoFrame: {
            width: 1080,
            height: 1920,
        },
        fps: 30,
        aspectRatio: '9:16',
    });
    await page.goto(`http://localhost:${serverPort}`);
    await page.waitForSelector('[data-screen-ready="true"]', {
        timeout: 10000,
    });
    await recorder.start(fileOutput); // supports extension - mp4, avi, webm and mov
    await wait(5000);
    await recorder.stop();
    await browser.close();
    await server.close();
}

startRecorder();
