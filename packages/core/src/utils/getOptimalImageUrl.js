// eslint-disable-next-line import/prefer-default-export
const getOptimalImageUrl = (
    media = null,
    containerWidth = null,
    containerHeight = null,
    maxDiff = 800
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
            const { diff: currentDiff, isLarger: currentIsLarger, size: currentSize } = acc;
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
            const size = (width || 0) + (height || 0);
            const sizeIsLarger = size > currentSize;

            if (
                // Difference is lower and image is larger
                (diff < currentDiff && isLarger) ||
                // Difference is lower and current is not larger or diff is greater than max
                (diff < currentDiff && ((!currentIsLarger && sizeIsLarger) || currentDiff > maxDiff)) ||
                // Image is larger and diff is smaller than max
                (diff <= maxDiff && !currentIsLarger && isLarger) ||
                // Image is larger than previous
                (diff <= maxDiff && !currentIsLarger && !isLarger && sizeIsLarger)
            ) {
                return {
                    key,
                    url,
                    diff,
                    isLarger,
                };
            }
            return acc;
        },
        { key: null, url: defaultUrl, diff: Infinity, isLarger: false, size: 0 },
    );

    return finalUrl;
};

export default getOptimalImageUrl;
