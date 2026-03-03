import { sync } from 'glob';
import path from 'path';
import { dts } from 'rollup-plugin-dts';
import ignoreImport from 'rollup-plugin-ignore-import';

const files = sync('./es/*.js');

const config = files.map((file) => {
    const name = path.basename(file, '.js');
    return {
        input: `./types/${name}.d.ts`,
        output: [{ file: `es/${name}.d.ts`, format: 'es' }],
        plugins: [
            ignoreImport({
                extensions: ['.css', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.mp4'],
            }),
            dts(),
        ],
        external: [/\.css$/, /\.(png|jpe?g|gif|svg|webp|mp4)$/],
    };
});

export default config;
