import isArray from 'lodash/isArray';

import getFieldByName from './getFieldByName';

const getFieldFromPath = (path, fields, fieldManager) =>
    (isArray(path) ? path : [path]).reduce(
        (foundField, key) => {
            if (foundField === null) {
                return null;
            }
            const { type = null, fields: fieldFields = null, field = null, itemsField = null } = foundField;
            const finalType = field !== null ? field.type || type : type;
            const { fields: subFields = null, settings = null, itemsField: defItemsField = null } =
                finalType !== null ? fieldManager.getDefinition(finalType) : foundField;
            const finalItemsField = itemsField || defItemsField;
            if (finalItemsField !== null && key.match(/^[0-9]+$/)) {
                return { ...finalItemsField, name: path.join('/'), listItems: true };
            }

            return getFieldByName(
                [
                    ...(fieldFields || []),
                    ...(subFields || []),
                    ...(settings || []),
                ],
                key,
            );
        },
        { fields },
    );

export default getFieldFromPath;
