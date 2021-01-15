import { v1 as uuid } from 'uuid';
import isString from 'lodash/isString';

const createScreen = (definition, data = {}) => {
    const { id, layouts = null, fields = [] } = isString(definition)
        ? { id: definition }
        : definition;

    const defaultValueFields = fields.reduce((all, curr) => {
        const { name = null, defaultValue = null } = curr || {};
        const newAll = { ...all };
        if (defaultValue !== null && name !== null) {
            newAll[name] = defaultValue;
        }
        return newAll;
    }, {});

    return {
        id: uuid(),
        type: id,
        ...(layouts !== null
            ? {
                  layout: layouts[0],
              }
            : {}),
        ...defaultValueFields,
        ...data,
    };
};

export default createScreen;
