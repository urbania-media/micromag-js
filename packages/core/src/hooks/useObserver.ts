import { useIntersectionObserver, useResizeObserver } from '@folklore/hooks';
import isArray from 'lodash/isArray';

export { useIntersectionObserver, useResizeObserver };

export function useDimensionObserver(opts) {
    const { entry, ...rest } = useResizeObserver(opts);
    const { contentRect = null, borderBoxSize = null } = entry || {};
    const { width = 0, height = 0 } = contentRect || {};
    const { blockSize = null, inlineSize = null } = isArray(borderBoxSize)
        ? borderBoxSize[0] || {}
        : borderBoxSize || {};
    return {
        ...rest,
        entry,
        width: inlineSize || width,
        height: blockSize || height,
    };
}
