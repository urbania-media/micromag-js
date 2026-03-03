import isArray from 'lodash/isArray';

import getFieldByName from './getFieldByName';

const getFieldFromPath = (path, fields, fieldManager) =>
    (isArray(path) ? path : [path]).reduce(
        (foundField, key) => {
            if (foundField === null) {
                return null;
            }
            const { type = null } = foundField;
            const { fields: subFields = null, settings = null, itemsField = null } =
                type !== null ? fieldManager.getDefinition(type) : foundField;
            if (itemsField !== null && key.match(/^[0-9]+$/)) {
                return { ...itemsField, name: path.join('/'), listItems: true };
            }
            return getFieldByName([...(subFields || []), ...(settings || [])], key);
        },
        { fields },
    );

export default getFieldFromPath;
