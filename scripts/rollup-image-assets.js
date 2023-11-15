/* eslint-disable object-shorthand, func-names */
import url from '@rollup/plugin-url';
import { createFilter } from '@rollup/pluginutils';
import path from 'path';

export default function imageAssets(options = {}) {
    const filter = createFilter(options.include, options.exclude);
    const { load, ...plugin } = url({
        ...options,
        publicPath: '../assets/images/',
    });
    return {
        resolveId: async function (module, importer) {
            if (module.match(/^\./) === null) {
                return null;
            }
            const id = path.join(path.dirname(importer), module);
            if (!filter(id)) {
                return null;
            }
            const exportData = (await load.call(this, id)) || null;
            const matches = exportData.match(/^export default "([^\"]+)"$/);
            return matches !== null && matches[1].match(/^data:/) === null
                ? {
                      id: matches[1],
                      external: true,
                  }
                : null;
        },
        load,
        ...plugin,
    };
}
