import isObject from 'lodash/isObject';
import { MessageDescriptor } from 'react-intl';

export function isMessage(message: MessageDescriptor | unknown): message is MessageDescriptor {
    return (
        message !== null &&
        isObject(message) &&
        typeof (message as MessageDescriptor).id !== 'undefined'
    );
}

export default isMessage;
