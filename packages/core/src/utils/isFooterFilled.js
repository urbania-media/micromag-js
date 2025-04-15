const isFooterFilled = (footer = {}) => {
    if (footer === null || typeof footer === 'undefined') {
        return false;
    }
    const { callToAction = null } = footer || {};
    const { active: callToActionActive = false, label = null } = callToAction || {};
    const { body = null } = label || {};
    return callToActionActive && body !== null;
};

export default isFooterFilled;
