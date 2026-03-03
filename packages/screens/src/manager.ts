import isArray from 'lodash/isArray';

import { ScreensManager } from '@micromag/core';

import * as allScreens from './all';
import fieldsPattern from './fields';

const manager = new ScreensManager(
    Object.keys(allScreens).reduce(
        (screens, key) => [
            ...screens,
            ...(isArray(allScreens[key]) ? allScreens[key] : [allScreens[key]]),
        ],
        [],
    ),
);
manager.setFieldsPattern(fieldsPattern);

export default manager;
