// eslint-disable-next-line import/prefer-default-export
export const getFileName = (url = null) => {
    if (url === null) {
        return null;
    }
    return url.match(/([^/]+)(\?.*)?$/)[1] || url;
};
