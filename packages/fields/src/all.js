import { FieldsManager } from '@micromag/core';

import * as fields from './fields/index';

const allFields = Object.keys(fields).map(name => fields[name]);

const manager = new FieldsManager(allFields);

export default manager;
