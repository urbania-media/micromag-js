module.exports = {
    plugins: [
        require('postcss-import')({
            resolve(id, basedir) {
                // postcss-import's built-in resolver doesn't respect package.json "exports".
                // Fall back to require.resolve which does.
                try {
                    const resolved = require.resolve(id, { paths: [basedir] });
                    // If a CSS @import resolved to a .js file (e.g. bare @panneau/* package
                    // specifier), try the conventional assets/css/styles.css path instead.
                    if (resolved.endsWith('.js')) {
                        try {
                            return require.resolve(`${id}/assets/css/styles.css`, {
                                paths: [basedir],
                            });
                        } catch {
                            // ignore
                        }
                    }
                    return resolved;
                } catch {
                    // Let postcss-import's default resolver handle it
                    return id;
                }
            },
        }),
        require('postcss-nested'),
        require('postcss-flexbugs-fixes'),
        require('postcss-preset-env')({
            autoprefixer: {
                flexbox: 'no-2009',
            },
        }),
        require('cssnano')({
            preset: [
                'default',
                {
                    svgo: {
                        plugins: [
                            {
                                name: 'preset-default',
                                overrides: {
                                    name: 'removeViewBox',
                                    active: false,
                                },
                            },
                        ],
                    },
                },
            ],
        }),
    ],
};
