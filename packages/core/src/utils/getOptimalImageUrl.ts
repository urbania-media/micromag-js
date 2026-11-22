interface ImageSize {
    url?: string | null;
    webp_url?: string | null;
    width?: number | null;
    height?: number | null;
}

interface OptimalImageMedia {
    url?: string | null;
    webp_url?: string | null;
    sizes?: Record<string, ImageSize> | null;
    metadata?: { width?: number | null; height?: number | null } | null;
}

interface GetOptimalImageUrlOptions {
    resolution?: number | null;
    supportsWebp?: boolean;
    /** @deprecated No longer used: the smallest size that covers the rendered size is chosen */
    maxDiff?: number;
}

const toDimension = (value: unknown): number | null =>
    typeof value === 'number' && Number.isFinite(value) && value > 0 ? value : null;

/**
 * Returns the URL of the smallest size of the image that covers the rendered size (container size
 * times resolution). When no size covers it, the largest one is returned. A media without `sizes`,
 * or a call without a container size, returns the media URL as before.
 */
const getOptimalImageUrl = (
    // Image medias, and any object with the same fields (ex.: `{ url }` for a video thumbnail)
    media: OptimalImageMedia | object | null = null,
    containerWidth: number | null = null,
    containerHeight: number | null = null,
    { resolution = 1, supportsWebp = false }: GetOptimalImageUrlOptions = {},
): string | null => {
    const {
        sizes = null,
        url: defaultUrl = null,
        webp_url: defaultWebpUrl = null,
        metadata = null,
    } = (media || {}) as OptimalImageMedia;
    const { width: imgWidth = null, height: imgHeight = null } = metadata || {};
    const finalDefaultUrl = supportsWebp && defaultWebpUrl !== null ? defaultWebpUrl : defaultUrl;

    if (sizes === null || (containerWidth === null && containerHeight === null)) {
        return finalDefaultUrl;
    }

    const finalResolution = toDimension(resolution) || 1;
    const targetWidth =
        toDimension(containerWidth) !== null ? containerWidth * finalResolution : null;
    const targetHeight =
        toDimension(containerHeight) !== null ? containerHeight * finalResolution : null;

    if (targetWidth === null && targetHeight === null) {
        return finalDefaultUrl;
    }

    const original = {
        url: finalDefaultUrl,
        width: toDimension(imgWidth),
        height: toDimension(imgHeight),
    };
    const originalHasSize = original.width !== null || original.height !== null;

    // The sizes first: on a tie with the original, the resized file wins
    const candidates = [
        ...Object.keys(sizes).map((key) => {
            const {
                url = null,
                webp_url: webpUrl = null,
                width = null,
                height = null,
            } = sizes[key] || {};
            return {
                url: supportsWebp && webpUrl !== null ? webpUrl : url,
                width: toDimension(width),
                height: toDimension(height),
            };
        }),
        original,
    ].filter(({ url, width, height }) => url !== null && (width !== null || height !== null));

    // Compare on the dimensions known on both sides
    const covers = ({ width, height }) =>
        (targetWidth === null || width === null || width >= targetWidth) &&
        (targetHeight === null || height === null || height >= targetHeight);
    const getArea = ({ width, height }) =>
        (width !== null ? width : height) * (height !== null ? height : width);

    const best = candidates.reduce((current, candidate) => {
        if (current === null) {
            return candidate;
        }
        const currentCovers = covers(current);
        const candidateCovers = covers(candidate);
        if (candidateCovers !== currentCovers) {
            return candidateCovers ? candidate : current;
        }
        const candidateArea = getArea(candidate);
        const currentArea = getArea(current);
        // Among sizes that cover, the smallest; when none covers, the largest
        if (candidateCovers ? candidateArea < currentArea : candidateArea > currentArea) {
            return candidate;
        }
        return current;
    }, null);

    // No size covers the rendered size and the original size is unknown: the original is the
    // largest file we can expect
    if (best === null || (!covers(best) && !originalHasSize)) {
        return finalDefaultUrl;
    }

    return best.url;
};

export default getOptimalImageUrl;
