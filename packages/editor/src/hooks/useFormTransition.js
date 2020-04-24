import { useRef, useMemo } from 'react';
import classNames from 'classnames';

const useFormTransition = (url, screenIndex, styles) => {
    const lastPageRef = useRef({
        url,
        screenIndex,
    });
    const direction = useMemo(() => {
        const { screenIndex: lastScreenIndex, url: lastUrl } = lastPageRef.current;
        lastPageRef.current.url = url;
        lastPageRef.current.screenIndex = screenIndex;
        const currentPartsCount = url.split('/').length;
        const previousPartsCount = lastUrl.split('/').length;
        if (screenIndex !== lastScreenIndex) {
            // return screenIndex > lastScreenIndex ? 'bottom' : 'top';
            return null;
        }
        return currentPartsCount > previousPartsCount ? 'right' : 'left';
    }, [url, screenIndex]);

    const name = useMemo(
        () => ({
            enter:
                classNames({
                    [styles.enterRight]: direction === 'right',
                    [styles.enterLeft]: direction === 'left',
                    [styles.enterTop]: direction === 'top',
                    [styles.enterBottom]: direction === 'bottom',
                }) || 'none',
            enterActive:
                classNames({
                    [styles.enterActiveHorizontal]: direction === 'left' || direction === 'right',
                    [styles.enterActiveVertical]: direction === 'top' || direction === 'bottom',
                }) || 'none',
            leave: styles.leave || 'none',
            leaveActive:
                classNames({
                    [styles.leaveActiveRight]: direction === 'right',
                    [styles.leaveActiveLeft]: direction === 'left',
                    [styles.leaveActiveTop]: direction === 'top',
                    [styles.leaveActiveBottom]: direction === 'bottom',
                }) || 'none',
        }),
        [direction, screenIndex],
    );

    return {
        direction,
        name,
        timeout: direction === 'left' || direction === 'right' ? 300 : 600,
    };
};

export default useFormTransition;
