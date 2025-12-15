import { createConfig } from '../../rollup.config';

const files = {

};

export default Object.keys(files).reduce(
    (configs, file) => [
        ...configs,
        createConfig({
            file,
            format: 'both',
            ...files[file],
        }),
    ],
    [],
);
