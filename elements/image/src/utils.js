// eslint-disable-next-line import/prefer-default-export
export const getOptimizedImageUrl = (width = null, height = null, media = null) => {
    const { sizes = null, url: defaultUrl = null } = media || {};

    let finalUrl = defaultUrl;

    if (sizes !== null && width !== null && height !== null) {
        const sizesArray = Object.values(sizes).filter((s) => {
            const { width: w, height: h } = s;
            const widthIsLarger = width !== 0 && width < w;
            const heightIsLarger = height !== 0 && height < h;
            return widthIsLarger && heightIsLarger;
        });
        const previousDiff = { dw: 0, dh: 0 };
        sizesArray.forEach((s, idx) => {
            const { width: w, height: h, url } = s;
            const diffWidth = w - width;
            const diffHeight = h - height;

            if ((diffWidth < previousDiff.dw && diffHeight < previousDiff.dh) || idx === 0) {
                previousDiff.dw = diffWidth;
                previousDiff.dh = diffHeight;
                finalUrl = url;
            }
        });
    }

    return finalUrl;
};
