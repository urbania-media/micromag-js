function checkClickable(el, options = {}, parentDistance = 1) {
    const { maxParentDistance = 7, tags = ['BUTTON', 'A', 'INPUT', 'TEXTAREA'] } = options || {};
    const { tagName = null, parentNode = null, dataset = {}, classList = null } = el || {};

    if (tagName === 'BODY') {
        return false;
    }

    // Check if video is suspended
    // if (
    //     tagName === 'VIDEO' &&
    //     typeof dataset.isSuspended !== 'undefined' &&
    //     (dataset.isSuspended === 'true' || dataset.isSuspended === true)
    // ) {
    //     return true;
    // }

    if (
        tags.map((it) => it.toLowerCase()).indexOf(tagName.toLowerCase()) !== -1 ||
        (classList !== null && classList.contains('clickable'))
    ) {
        return true;
    }

    if (parentDistance < maxParentDistance) {
        return checkClickable(parentNode, options, parentDistance + 1);
    }

    return false;
}

export default checkClickable;
