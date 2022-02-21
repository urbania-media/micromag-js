import { v1 as uuid } from 'uuid';
import isString from 'lodash/isString';
import getScreenFieldsWithStates from './getScreenFieldsWithStates';

const createScreen = (definition, data = {}) => {
    const finalDefinition = isString(definition) ? { id: definition } : definition;
    const { id } = finalDefinition;
    const screenFields = getScreenFieldsWithStates(finalDefinition)

    const defaultValueFields = screenFields.reduce((all, curr) => {
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
