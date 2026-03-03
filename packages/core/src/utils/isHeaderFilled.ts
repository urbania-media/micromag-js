const isHeaderFilled = (header = {}) => {
    if (header === null || typeof header === 'undefined') {
        return false;
    }
    const { badge = null } = header || {};
    const { active: badgeActive = false, label = null } = badge || {};
    const { body = null } = label || {};
    return badgeActive && body !== null;
};

export default isHeaderFilled;
