import isObject from 'lodash/isObject';

const isMessage = message => isObject(message) && typeof message.id !== 'undefined';

export default isMessage;
