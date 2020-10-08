import createSchemaId from './createSchemaId';

const schemaId = str => createSchemaId(str.join('/'));

export default schemaId;
