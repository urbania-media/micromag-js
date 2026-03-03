import { createRequire } from 'module';

const require = createRequire(import.meta.url);
require('dotenv').config();

const proxyMiddleware = require('./api/proxy');
const apiMiddleware = require('./api/middleware');

// For local API with micromag.studio
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

export default (router) => {
    const proxyUrl = process.env.API_PROXY_URL || null;

    if (proxyUrl !== null) {
        router.use('/api', proxyMiddleware(proxyUrl));
    } else {
        router.use('/api', apiMiddleware());
    }
};
