import { v1 as uuid } from 'uuid';
import isString from 'lodash/isString';

const createScreen = (definition, data = {}) => {
    const { id, fields = [] } = isString(definition) ? { id: definition } : definition;

    const defaultValueFields = fields.reduce((all, curr) => {
        const { name = null, defaultValue = null } = curr || {};
        const newAll = { ...all };

        if (name !== null && defaultValue !== null) {
            newAll[name] = defaultValue;
        }

        return newAll;
    }, {});

    return {
        type: id,
        ...defaultValueFields,
        ...data,
        id: uuid(),
    };
};

export default createScreen;
