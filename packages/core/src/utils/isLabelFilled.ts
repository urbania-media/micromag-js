const isTextFilled = (text) => {
    if (text === null || typeof text === 'undefined') {
        return false;
    }
    const { label = null } = text || {};
    const { length = 0 } = label || {};
    return typeof length === 'number' && length > 0;
};

export default isTextFilled;
