export const stripTags = (str) => {
    if (!str) {
        return null;
    }
    return str.replace(/(<([^>]+)>)/gi, '');
};

export default stripTags;
