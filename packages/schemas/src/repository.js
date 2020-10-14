// import * as fieldsSchemas from '@micromag/fields/schemas';
// import * as screensSchemas from '@micromag/screens/schemas';
// import * as elementsSchemas from '@micromag/elements/schemas';

import * as baseSchemas from './schemas/index';

import SchemasRepository from './SchemasRepository';

const repository = new SchemasRepository();

repository.addSchemas(Object.values(baseSchemas));
// repository.addSchemas(Object.values(elementsSchemas));
// repository.addSchemas(Object.values(fieldsSchemas));
// repository.addSchemas(Object.values(screensSchemas));

export default repository;
