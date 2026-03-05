import fieldsModule from '../fields';

const fieldsPattern = process.env.NODE_ENV === 'production' ? fieldsModule : null;
export default fieldsPattern;
