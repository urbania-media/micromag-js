import { v1 as uuid } from 'uuid';
import isString from 'lodash/isString';

const createScreen = (definition, data = {}) => {
    const { id, layouts = null } = isString(definition) ? { id: definition } : definition;
    return {
        id: uuid(),
        type: id,
        ...(layouts !== null
            ? {
                  layout: layouts[0],
              }
            : {}),
        ...data,
    };
};

export default createScreen;
