import express from 'express';
import getPort, { portNumbers } from 'get-port';

const startServer = async (path, port = null) => {
    const finalPort =
        port ||
        (await getPort({
            port: portNumbers(3050, 3100),
        }));
    return new Promise((resolve) => {
        const app = express();
        app.use(express.static(path));
        const server = app.listen(finalPort, () => resolve(server));
    });
};

export default startServer;
