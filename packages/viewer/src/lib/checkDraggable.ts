function checkDraggable(el, options = {}, parentDistance = 1) {
    const { maxParentDistance = 5 } = options || {};
    const { tagName = null, parentNode = null, dataset = {} } = el || {};

    if (tagName === 'BODY') {
        return false;
    }

    if (typeof dataset.draggable !== 'undefined') {
        return true;
    }

    if (parentDistance < maxParentDistance) {
        return checkDraggable(parentNode, options, parentDistance + 1);
    }

    return false;
}

export default checkDraggable;
