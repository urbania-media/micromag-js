const isImageFilled = (image) => {
    if (image === null || typeof image === 'undefined') {
        return false;
    }

    const { media = null, url = null } = image || {};
    return media !== null || url !== null;
};

export default isImageFilled;
