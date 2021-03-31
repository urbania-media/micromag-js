import { v1 as uuid } from 'uuid';
import isString from 'lodash/isString';

const createScreen = (definition, data = {}, fieldsManager) => {
    const { id, fields = [] } = isString(definition)
        ? { id: definition }
        : definition;

    const defaultValueFields = fields.reduce((all, curr) => {
        const { name = null, defaultValue = null, type } = curr || {};
        const fieldDefinition = fieldsManager.getDefinition(type);
        const { defaultValue: definitionDefaultValue = null } = fieldDefinition || {};
        const newAll = { ...all };

        if (name !== null) {
            if (definitionDefaultValue !== null) {
                newAll[name] = definitionDefaultValue;
            }

            if (defaultValue !== null) {
                newAll[name] = defaultValue;
            }
        }
        
        return newAll;
    }, {});

    return {
        id: uuid(),
        type: id,
        ...defaultValueFields,
        ...data,
    };
};

export default createScreen;
