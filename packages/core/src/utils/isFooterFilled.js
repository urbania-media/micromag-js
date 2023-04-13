const isFooterFilled = (footer = {}) => {
    const { callToAction = null } = footer || {};
    const { active: callToActionActive = false, label = null } = callToAction || {};
    const { body = null } = label || {};
    return callToActionActive && body !== null;
};

export default isFooterFilled;
