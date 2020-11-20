const isImageFilled = (image) => {
    const { media = null } = image || {};
    return media !== null;
};

export default isImageFilled;
