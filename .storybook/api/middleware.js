const path = require('path');
const express = require('express');
const { sync: globSync } = require('glob');

module.exports = () => {
    const router = express.Router();
    const dataPath = path.join(__dirname, '/data');

    router.use(
        '/',
        express.static(dataPath, {
            index: false,
            extensions: ['json'],
        }),
    );

    router.post('/auth/login', (req, res) => {
        res.json(require(path.join(dataPath, '/me.json')));
        res.end();
    });

    router.get('/:resource', (req, res) => {
        const filesPath = path.join(dataPath, `${req.params.resource}/*.json`);
        const data = globSync(filesPath).map(filePath =>
            require(filePath),
        );
        res.json(data);
        res.end();
    });

    return router;
};
