import { useWindowSize } from '@folklore/hooks';
import { match as matchMediaQuery } from 'css-mediaquery';
import { useEffect, useMemo, useState } from 'react';

import { useDimensionObserver } from './useObserver';

export const useDevicePixelRatio = () => {
    const [pixelRatio, setPixelRatio] = useState(1);
    useEffect(() => {
        setPixelRatio(typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1);
    }, [setPixelRatio]);
    return pixelRatio;
};

const useScreenSize = ({
    width = null,
    height = null,
    landscape = false,
    menuOverScreen = false,
    screens: initialScreens = null,
    mediaType = 'screen',
    media: providedMedia = null,
    scale = null,
}) => {
    const devicePixelRatio = useDevicePixelRatio();
    const screens = initialScreens || [];
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
            resolution: scale !== null ? scale * devicePixelRatio : devicePixelRatio,
            imageResolution: scale !== null ? Math.max(scale, devicePixelRatio) : devicePixelRatio,
        };
    }, [screens, providedMedia, mediaType, width, height, landscape, menuOverScreen]);
    return screenSize;
};

export const useScreenSizeFromElement = (options = null) => {
    const { width = null, height = null, ...opts } = options || {};
    const {
        ref,
        width: calculatedWidth = 0,
        height: calculatedHeight = 0,
    } = useDimensionObserver();
    const devicePixelRatio = useDevicePixelRatio();
    const fullWidth = width !== null ? width : calculatedWidth;
    const fullHeight = height !== null ? height : calculatedHeight;

    const {
        screenWidth = 320,
        screenHeight = 480,
        withoutMaxSize = false,
        landscapeMinHeight = 600,
        menuAlwaysOverScreen = true,
        // screenRatio = 320 / 480,
        landscapeMinRatio = 2 / 3,
        withoutScale = false,
    } = opts || {};
    const screenRatio = screenWidth / screenHeight;
    const elementRatio = fullWidth / fullHeight;
    const landscape = fullHeight > 0 && elementRatio > (landscapeMinRatio || screenRatio);
    const landscapeWithMaxSize = landscape && !withoutMaxSize;

    let finalWidth = fullWidth;
    let finalHeight = fullHeight;
    let menuOverScreen = !landscape;

    if (landscapeWithMaxSize) {
        if (fullHeight < landscapeMinHeight || menuAlwaysOverScreen) {
            menuOverScreen = true;
        } else {
            finalHeight = fullHeight - 100;
        }

        finalWidth = Math.round(finalHeight * screenRatio);
    }

    if (finalWidth % 2 === 1) {
        finalWidth -= 1;
    }

    if (finalHeight % 2 === 1) {
        finalHeight -= 1;
    }

    const scale = finalWidth > 0 ? finalWidth / screenWidth : null;

    const screenSize = useScreenSize({
        width: withoutScale || scale === null ? finalWidth : screenWidth,
        height: withoutScale || scale === null ? finalHeight : finalHeight / scale,
        landscape,
        menuOverScreen,
        scale: !withoutScale ? scale : null,
        ...opts,
    });

    return {
        ref,
        fullWidth,
        fullHeight,
        screenSize,
        scale: !withoutScale ? scale : null,
        resolution: !withoutScale ? scale * devicePixelRatio : devicePixelRatio,
    };
};

export const useScreenSizeFromWindow = (opts) => {
    const windowSize = useWindowSize();
    return useScreenSize({
        ...opts,
        ...windowSize,
    });
};

export default useScreenSize;
