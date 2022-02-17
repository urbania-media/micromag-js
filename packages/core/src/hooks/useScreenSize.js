import { match as matchMediaQuery } from 'css-mediaquery';
import { useEffect, useMemo, useState } from 'react';
import { useResizeObserver } from './useObserver';

const useScreenSize = ({
    width = null,
    height = null,
    landscape = false,
    menuOverScreen = false,
    screens = [],
    mediaType = 'screen',
    media: providedMedia = null,
}) => {
    const screenSize = useMemo(() => {
        const media =
            providedMedia !== null
                ? providedMedia
                : {
                      type: mediaType,
                      width: `${width}px`,
                      height: `${height}px`,
                  };
        const matchingScreens = [...screens]
            .reverse()
            .filter(
                ({ mediaQuery = null }) =>
                    mediaQuery === null || matchMediaQuery(mediaQuery, media),
            );
        return {
            screen: matchingScreens.length > 0 ? matchingScreens[0].name : null,
            screens: [...matchingScreens].reverse().map(({ name }) => name),
            width,
            height,
            landscape,
            menuOverScreen,
        };
    }, [screens, providedMedia, mediaType, width, height, landscape, menuOverScreen]);
    return screenSize;
};

export const useScreenSizeFromElement = ({ width = null, height = null, ...opts } = {}) => {
    const {
        ref,
        entry: { contentRect },
    } = useResizeObserver();
    const { width: calculatedWidth = 0, height: calculatedHeight = 0 } = contentRect || {};
    const fullWidth = width !== null ? width : calculatedWidth;
    const fullHeight = height !== null ? height : calculatedHeight;

    const {
        withoutMaxSize = false,
        landscapeMinHeight = 600,
        landscapeHeightRatio = 3 / 4,
        screenRatio = 360 / 480,
        landscapeMinRatio = 3 / 4,
    } = opts || {};
    const elementRatio = fullWidth / fullHeight;
    const landscape = fullHeight > 0 && elementRatio > (landscapeMinRatio || screenRatio);
    const landscapeWithMaxSize = landscape && !withoutMaxSize;

    let finalWidth = fullWidth;
    let finalHeight = fullHeight;
    let menuOverScreen = !landscape;

    if (landscapeWithMaxSize) {
        if (fullHeight < landscapeMinHeight) {
            menuOverScreen = true;
        } else {
            finalHeight = Math.round(fullHeight * landscapeHeightRatio);
        }

        finalWidth = Math.round(finalHeight * screenRatio);
    }

    if (finalWidth % 2 === 1) {
        finalWidth -= 1;
    }

    if (finalHeight % 2 === 1) {
        finalHeight -= 1;
    }

    const screenSize = useScreenSize({
        width: finalWidth,
        height: finalHeight,
        landscape,
        menuOverScreen,
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
