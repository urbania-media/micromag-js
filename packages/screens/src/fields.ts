// @ts-ignore - dynamic require for production build
const fieldsPattern = process.env.NODE_ENV === 'production' ? require('../fields') : null;
export default fieldsPattern;
