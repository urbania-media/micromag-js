// eslint-disable-next-line import/no-extraneous-dependencies
import baseConfig from '../../rollup.config';

export default (args) => {
    return [
        baseConfig(args),
        {
            ...baseConfig({
                ...args,
                withoutPostCss: true,
            }),
            input: 'src/definition.js',
            output: [
                {
                    file: 'definition.js',
                },
            ],
        },
    ];
};
