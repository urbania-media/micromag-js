#!/usr/bin/env node
'use strict';

var path = require('path');
var puppeteer = require('puppeteer');
var puppeteerScreenRecorder = require('puppeteer-screen-recorder');
var express = require('express');
var net = require('node:net');
var os = require('node:os');

class Locked extends Error {
	constructor(port) {
		super(`${port} is locked`);
	}
}

const lockedPorts = {
	old: new Set(),
	young: new Set(),
};

// On this interval, the old locked ports are discarded,
// the young locked ports are moved to old locked ports,
// and a new young set for locked ports are created.
const releaseOldLockedPortsIntervalMs = 1000 * 15;

// Lazily create timeout on first use
let timeout;

const getLocalHosts = () => {
	const interfaces = os.networkInterfaces();

	// Add undefined value for createServer function to use default host,
	// and default IPv4 host in case createServer defaults to IPv6.
	const results = new Set([undefined, '0.0.0.0']);

	for (const _interface of Object.values(interfaces)) {
		for (const config of _interface) {
			results.add(config.address);
		}
	}

	return results;
};

const checkAvailablePort = options =>
	new Promise((resolve, reject) => {
		const server = net.createServer();
		server.unref();
		server.on('error', reject);

		server.listen(options, () => {
			const {port} = server.address();
			server.close(() => {
				resolve(port);
			});
		});
	});

const getAvailablePort = async (options, hosts) => {
	if (options.host || options.port === 0) {
		return checkAvailablePort(options);
	}

	for (const host of hosts) {
		try {
			await checkAvailablePort({port: options.port, host}); // eslint-disable-line no-await-in-loop
		} catch (error) {
			if (!['EADDRNOTAVAIL', 'EINVAL'].includes(error.code)) {
				throw error;
			}
		}
	}

	return options.port;
};

const portCheckSequence = function * (ports) {
	if (ports) {
		yield * ports;
	}

	yield 0; // Fall back to 0 if anything else failed
};

async function getPorts(options) {
	let ports;
	let exclude = new Set();

	if (options) {
		if (options.port) {
			ports = typeof options.port === 'number' ? [options.port] : options.port;
		}

		if (options.exclude) {
			const excludeIterable = options.exclude;

			if (typeof excludeIterable[Symbol.iterator] !== 'function') {
				throw new TypeError('The `exclude` option must be an iterable.');
			}

			for (const element of excludeIterable) {
				if (typeof element !== 'number') {
					throw new TypeError('Each item in the `exclude` option must be a number corresponding to the port you want excluded.');
				}

				if (!Number.isSafeInteger(element)) {
					throw new TypeError(`Number ${element} in the exclude option is not a safe integer and can't be used`);
				}
			}

			exclude = new Set(excludeIterable);
		}
	}

	if (timeout === undefined) {
		timeout = setTimeout(() => {
			timeout = undefined;

			lockedPorts.old = lockedPorts.young;
			lockedPorts.young = new Set();
		}, releaseOldLockedPortsIntervalMs);

		// Does not exist in some environments (Electron, Jest jsdom env, browser, etc).
		if (timeout.unref) {
			timeout.unref();
		}
	}

	const hosts = getLocalHosts();

	for (const port of portCheckSequence(ports)) {
		try {
			if (exclude.has(port)) {
				continue;
			}

			let availablePort = await getAvailablePort({...options, port}, hosts); // eslint-disable-line no-await-in-loop
			while (lockedPorts.old.has(availablePort) || lockedPorts.young.has(availablePort)) {
				if (port !== 0) {
					throw new Locked(port);
				}

				availablePort = await getAvailablePort({...options, port}, hosts); // eslint-disable-line no-await-in-loop
			}

			lockedPorts.young.add(availablePort);

			return availablePort;
		} catch (error) {
			if (!['EADDRINUSE', 'EACCES'].includes(error.code) && !(error instanceof Locked)) {
				throw error;
			}
		}
	}

	throw new Error('No available ports found');
}

function portNumbers(from, to) {
	if (!Number.isInteger(from) || !Number.isInteger(to)) {
		throw new TypeError('`from` and `to` must be integer numbers');
	}

	const generator = function * (from, to) {
		for (let port = from; port <= to; port++) {
			yield port;
		}
	};

	return generator(from, to);
}

const startServer = async (path, port = null) => {
    const finalPort =
        port ||
        (await getPorts({
            port: portNumbers(3050, 3100),
        }));
    return new Promise((resolve) => {
        const app = express();
        app.use(express.static(path));
        const server = app.listen(finalPort, () => resolve(server));
    });
};

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
    const recorder = new puppeteerScreenRecorder.PuppeteerScreenRecorder(page, {
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
