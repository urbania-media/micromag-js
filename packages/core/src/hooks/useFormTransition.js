import { useRef, useMemo } from 'react';
import classNames from 'classnames';

const useFormTransition = (paths = [], styles = {}) => {
    const lastPageRef = useRef(paths || []);

    const direction = useMemo(() => {
        const currentPartsCount = paths.length;
        if (lastPageRef.current) {
            const previousPartsCount = lastPageRef.current.length;
            lastPageRef.current = paths || [];
            return currentPartsCount > previousPartsCount ? 'right' : 'left';
        }
        return null;
    }, [paths]);

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
        [direction],
    );

    return {
        direction,
        name,
        timeout: direction === 'left' || direction === 'right' ? 300 : 10,
    };
};

export default useFormTransition;
