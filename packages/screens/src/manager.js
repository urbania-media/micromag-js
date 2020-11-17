import { ScreensManager } from '@micromag/core';

import allManager from './all';

const manager = new ScreensManager();
manager.merge(allManager);

export default manager;
