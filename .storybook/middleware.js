const proxyMiddleware = require('./api/proxy');
const apiMiddleware = require('./api/middleware');

module.exports = (router) => {
    const proxyUrl = process.env.PROXY_URL || null;
    if (proxyUrl !== null) {
        router.use('/api', proxyMiddleware(proxyUrl));
    } else {
        router.use('/api', apiMiddleware());
    }
};
