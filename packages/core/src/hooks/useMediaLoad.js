import { useRef, useEffect } from 'react';

function useMediaLoad(element, { preload = 'auto', shouldLoad = false } = {}) {
    const firstPreloadRef = useRef(preload);
    const firstShouldLoadRef = useRef(shouldLoad);
    const hasLoadedRef = useRef(preload !== 'none' && preload !== 'metadata' && shouldLoad);
    useEffect(() => {
        const canLoad = preload !== 'none' && preload !== 'metadata' && shouldLoad; // @todo
        const preloadHasChanged = firstPreloadRef.current !== preload;
        const shouldLoadHasChanged = firstShouldLoadRef.current !== shouldLoad;
        if (
            canLoad &&
            (preloadHasChanged || shouldLoadHasChanged) &&
            !hasLoadedRef.current &&
            element !== null &&
            typeof element.load !== 'undefined'
        ) {
            hasLoadedRef.current = true;
            element.load();
        }
    }, [element, shouldLoad, preload]);
}

export default useMediaLoad;
