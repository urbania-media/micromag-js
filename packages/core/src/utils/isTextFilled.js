const isTextFilled = (text) => {
    const { body = null } = text || {};
    const { length = 0 } = body || {};
    return typeof length === 'number' && length > 0;
};

export default isTextFilled;
