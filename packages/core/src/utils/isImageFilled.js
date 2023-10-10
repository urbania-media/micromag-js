const isImageFilled = (image) => {
    const { media = null, url = null } = image || {};
    return media !== null || url !== null;
};

export default isImageFilled;
