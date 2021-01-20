import express from 'express';

const startServer = async (path, port = 3003) => new Promise((resolve) => {
    const app = express();
    app.use(express.static(path));
    const server = app.listen(port, () => resolve(server));
});

export default startServer;
