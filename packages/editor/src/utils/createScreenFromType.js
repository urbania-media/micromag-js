import uuid from 'uuid/v1';

const createScreenFromType = (type, data = {}) => ({
    id: uuid(),
    type,
    // ...getDefaultValuesForScreenType(type),
    ...data,
});

export default createScreenFromType;
