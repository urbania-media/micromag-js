const apiMiddleware = require('./api/middleware');

module.exports = (router) => {
    router.use('/api', apiMiddleware());
};
