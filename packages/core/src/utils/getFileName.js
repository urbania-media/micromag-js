const getFileName = (url = null) => {
    if (url === null) {
        return null;
    }
    return url.match(/([^/]+)(\?.*)?$/)[1] || url;
};

export default getFileName;
