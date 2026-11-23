import { createConfig } from '../../rollup.config';

export default [
    createConfig({ file: 'index.ts', format: 'es' }),
    // The viewer with its screens loaded on demand, and its CSS without the screens (lazy.css)
    createConfig({ file: 'lazy.ts', format: 'es', cssFile: 'lazy.css' }),
];
