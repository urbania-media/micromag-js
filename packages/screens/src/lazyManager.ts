import fieldsModule from '../fields';
import themeModule from '../theme-fields';
import createLazyScreensManager from './lazy/createLazyScreensManager';
import loaders from './lazy/loaders';

// The patterns are required here: the lazy screens have no fields to compute them from
const lazyManager = createLazyScreensManager(loaders, { ...fieldsModule, theme: themeModule });

export default lazyManager;
