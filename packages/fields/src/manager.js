import { FieldsManager } from '@micromag/core';

import * as allFields from './all';

const manager = new FieldsManager(Object.keys(allFields).map(key => allFields[key]));

export default manager;
