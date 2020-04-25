const path = require('path');
const express = require('express');
const { sync: globSync } = require('glob');

module.exports = () => {
    const router = express.Router();
    const dataPath = path.join(__dirname, '/data');

    const getResourceItems = resource => {
        const filesPath = path.join(dataPath, `${resource}/*.{js,json}`);
        return globSync(filesPath).map(filePath => require(filePath));
    };

    router.use(
        '/',
        express.static(dataPath, {
            index: false,
            extensions: ['json'],
        }),
    );

    router.post('/auth/login', (req, res) => {
        res.json(require(path.join(dataPath, '/me')));
        res.end();
    });

    router.get('/:resource', (req, res) => {
        const items = getResourceItems(req.params.resource);
        if (items.length === 0) {
            res.sendStatus(404);
            return;
        }
        res.json(items);
        res.end();
    });

    router.get('/:resource/:slug', (req, res) => {
        const items = getResourceItems(req.params.resource);
        const item = items.find(({ slug = null }) => slug === req.params.slug) || null;
        if (item === null) {
            res.sendStatus(404);
            return;
        }
        res.json(item);
        res.end();
    });

    return router;
};
