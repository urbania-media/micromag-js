import resolve from '@rollup/plugin-node-resolve';

export default {
    input: 'src/cli.ts',
    output: {
        file: 'bin/recorder.js',
        format: 'cjs',
        banner: '#!/usr/bin/env node',
    },
    plugins: [resolve({
        preferBuiltins: true,
        extensions: ['.ts', '.js', '.json'],
        resolveOnly: [
            /get-port/,
            /^\./,
        ],
    })],
};

// export default [
//     createConfig({
//         input: 'src/cli.js',
//         output: 'bin/recorder.js',
//         banner: '#!/usr/bin/env node',
//         format: 'node',
//         prependPlugins: [
//             resolve({
//                 modulesOnly: true,
//                 resolveOnly: (...args) => {
//                     console.log(args);
//                     return false;
//                 },
//             })
//         ]
//     }),
// ];
