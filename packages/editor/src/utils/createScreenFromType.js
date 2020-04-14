import uuid from 'uuid/v1';

const createScreenFromType = (type, data = {}) => ({
    id: uuid(),
    type,
    ...data,
});

export default createScreenFromType;
