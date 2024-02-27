import { ScreensManager } from '@micromag/core';

import allManager from './all';
import fieldsPattern from './fields';

const manager = new ScreensManager();
manager.merge(allManager);
manager.setFieldsPattern(fieldsPattern);

export default manager;
