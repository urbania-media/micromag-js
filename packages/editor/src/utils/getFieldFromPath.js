import isArray from 'lodash/isArray';

import getFieldByName from './getFieldByName';

const getFieldFromPath = (path, fields, fieldManager) =>
    (isArray(path) ? path : [path]).reduce(
        (foundField, key) => {
            if (foundField === null) {
                return null;
            }
            const { type = null } = foundField;
            const { fields: subFields = null, settings = null, items = null } =
                type !== null ? fieldManager.getDefinition(type) : foundField;
            if (items !== null && key.match(/^[0-9]+$/)) {
                return  { type: items, name: path };
            }
            return getFieldByName(subFields || settings || [], key);
        },
        { fields },
    );

export default getFieldFromPath;
