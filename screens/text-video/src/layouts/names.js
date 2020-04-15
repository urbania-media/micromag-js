import fs from 'fs';
import path from 'path';
import { snakeCase } from '@micromag/core/utils';

const keys = fs
    .readdirSync(path.join(__dirname, './'))
    .filter(it => it.match(/\.jsx$/))
    .map(it => it.match(/([^./]+)\.jsx$/)[1]);
const names = keys.map(it => snakeCase(it));

export { names, keys };
export default names;
