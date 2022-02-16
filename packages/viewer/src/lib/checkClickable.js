function checkClickable(el, options = {}, distance = 1) {
    const { maxDistance = 5, tags = ['BUTTON', 'A', 'INPUT', 'TEXTAREA'] } = options || {};
    const { tagName = null, parentNode = null } = el || {};

    if (tagName === 'BODY') {
        return false;
    }

    if (tags.map((it) => it.toLowerCase()).indexOf(tagName.toLowerCase()) > -1) {
        return true;
    }

    if (distance < maxDistance) {
        return checkClickable(parentNode, options, distance + 1);
    }

    return false;
}

export default checkClickable;
