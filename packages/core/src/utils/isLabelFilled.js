const isTextFilled = (text) => {
    const { label = null } = text || {};
    const { length = 0 } = label || {};
    return typeof length === 'number' && length > 0;
};

export default isTextFilled;
