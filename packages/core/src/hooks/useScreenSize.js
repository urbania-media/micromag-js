import { useMemo, useState, useEffect } from 'react';
import { match as matchMediaQuery } from 'css-mediaquery';
import { useResizeObserver } from './useObserver';

const useScreenSize = ({
    width = null,
    height = null,
    screens = [],
    mediaType = 'screen',
    media: providedMedia = null,
}) => {
    // Get media
    const media = useMemo(
        () =>
            providedMedia !== null
                ? providedMedia
                : {
                      type: mediaType,
                      width: `${width}px`,
                      height: `${height}px`,
                  },
        [providedMedia, mediaType, width, height],
    );

    // Get matching screens
    const matchingScreens = useMemo(
        () =>
            [...screens]
                .reverse()
                .filter(
                    ({ mediaQuery = null }) =>
                        mediaQuery === null || matchMediaQuery(mediaQuery, media),
                ),
        [screens, media],
    );

    return {
        screen: matchingScreens.length > 0 ? matchingScreens[0].name : null,
        screens: [...matchingScreens].reverse().map(({ name }) => name),
        width,
        height,
    };
};

export const useScreenSizeFromElement = ({ width = null, height = null, ...opts } = {}) => {
    const {
        ref,
        entry: { contentRect },
    } = useResizeObserver();
    const { width: calculatedWidth = 0, height: calculatedHeight = 0 } = contentRect || {};
    const finalWidth = width !== null ? width : calculatedWidth;
    const finalHeight = height !== null ? height : calculatedHeight;
    const screenSize = useScreenSize({
        width: finalWidth,
        height: finalHeight,
        ...opts,
    });
    return {
        ref,
        screenSize,
    };
};

const getWindowSize = () => ({
    width: typeof window !== 'undefined' ? window.innerWidth : null,
    height: typeof window !== 'undefined' ? window.innerHæeight : null,
});

export const useScreenSizeFromWindow = (opts) => {
    const [windowSize, setWindowSize] = useState(getWindowSize());
    useEffect(() => {
        const onResize = () => setWindowSize(getWindowSize());
        if (typeof window !== 'undefined') {
            window.addEventListener('resize', onResize);
        }
        return () => {
            if (typeof window !== 'undefined') {
                window.removeEventListener('resize', onResize);
            }
        };
    }, [setWindowSize]);
    return useScreenSize({
        ...opts,
        ...windowSize,
    });
};

export default useScreenSize;
