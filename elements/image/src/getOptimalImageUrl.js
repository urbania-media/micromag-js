// eslint-disable-next-line import/prefer-default-export
const getOptimalImageUrl = (
    media = null,
    containerWidth = null,
    containerHeight = null,
    maxDiff = 8000
) => {
    const { sizes = null, url: defaultUrl = null, metadata: { width: imgWidth, height: imgHeight } = {} } = media || {};

    if (sizes === null || (containerWidth === null && containerHeight === null)) {
        return defaultUrl;
    }

    const finalSizes = {
        original: {
            url: defaultUrl,
            width: imgWidth,
            height: imgHeight,
        },
        ...sizes,
    };

    const { url: finalUrl } = Object.keys(finalSizes).reduce(
        (acc, key) => {
            const { diff: currentDiff, isLarger: currentIsLarger } = acc;
            const { url, width = null, height = null } = finalSizes[key];
            const diffWidth =
                width !== null && containerWidth !== null ? width - containerWidth : null;
            const diffHeight =
                height !== null && containerHeight !== null ? height - containerHeight : null;
            const isLarger =
                (diffWidth === null || diffWidth >= 0) && (diffHeight === null || diffHeight >= 0);
            let diff =
                [diffWidth, diffHeight].reduce(
                    (total, value) => (value !== null ? (total || 0) + Math.abs(value) : total),
                    null,
                );
            if (diff === null) {
                diff = Infinity
            }

            if (
                // Difference is lower and image is larger
                (diff < currentDiff && isLarger) ||
                // Difference is lower and current is not larger or diff is greater than max
                (diff < currentDiff && (!currentIsLarger || currentDiff > maxDiff)) ||
                // Image is larger and diff is smaller than max
                (diff <= maxDiff && !currentIsLarger && isLarger)
            ) {
                return {
                    url,
                    diff,
                    isLarger,
                };
            }
            return acc;
        },
        { url: defaultUrl, diff: Infinity, isLarger: false },
    );

    // if (sizes !== null && width !== null && height !== null) {
    //     const sizesArray = Object.values(sizes).filter((s) => {
    //         const { width: w, height: h } = s;
    //         const widthIsLarger = width !== 0 && width < w;
    //         const heightIsLarger = height !== 0 && height < h;
    //         return widthIsLarger && heightIsLarger;
    //     });
    //     const previousDiff = { dw: 0, dh: 0 };
    //     sizesArray.forEach((s, idx) => {
    //         const { width: w, height: h, url } = s;
    //         const diffWidth = w - width;
    //         const diffHeight = h - height;
    //
    //         if ((diffWidth < previousDiff.dw && diffHeight < previousDiff.dh) || idx === 0) {
    //             previousDiff.dw = diffWidth;
    //             previousDiff.dh = diffHeight;
    //             finalUrl = url;
    //         }
    //     });
    // }

    return finalUrl;
};

export default getOptimalImageUrl;
