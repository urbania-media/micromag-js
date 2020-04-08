import { useRef, useState, useEffect, useCallback } from 'react';
import clamp from 'lodash/clamp';
import { useDrag } from 'react-use-gesture';

export const useSwipe = ({ width = null, display = 'flex', items = [] }) => {
    const index = useRef(0);
    const currentWidth = width || window.innerWidth;
    const count = items.length;

    const [props, set] = useState(
        items.map((item, i) => ({
            transform: `translate3d(${i * currentWidth}px, 0, 0)`,
            display,
            item,
        })),
    );

    const bind = useDrag(({ down, movement: [mx], direction: [xDir], distance, cancel }) => {
        // Block first and last
        if (down && index.current === items.length - 1 && xDir < 0) {
            cancel();
        }

        if (down && index.current === 0 && xDir > 0) {
            cancel();
        }

        // 1/3 threshold
        if (down && distance > currentWidth / 3) {
            cancel((index.current = clamp(index.current + (xDir > 0 ? -1 : 1), 0, count - 1)));
        }

        set(
            items.map((item, i) => {
                if (i < index.current - 1 || i > index.current + 1)
                    return { display: 'none', visibility: 'hidden' };
                const x = (i - index.current) * currentWidth + (down ? mx : 0);
                return {
                    transform: `translate3d(${x}px, 0, 0)`,
                    display,
                    visibility: 'visible',
                    item,
                };
            }),
        );
    });

    const reset = useCallback(() => {
        set(
            items.map((item, i) => {
                if (i < index.current - 1 || i > index.current + 1)
                    return { display: 'none', visibility: 'hidden' };
                const x = (i - index.current) * currentWidth;
                return {
                    transform: `translate3d(${x}px, 0, 0)`,
                    display,
                    visibility: 'visible',
                    item,
                };
            }),
        );
    }, [items, index, currentWidth]);

    const setIndex = useCallback(
        idx => {
            index.current = idx;
            reset();
        },
        [reset],
    );

    // Reset on resize
    useEffect(() => {
        set(
            items.map((item, i) => {
                if (i < index.current - 1 || i > index.current + 1)
                    return { display: 'none', visibility: 'hidden' };
                const x = (i - index.current) * currentWidth;
                return {
                    transform: `translate3d(${x}px, 0, 0)`,
                    display,
                    visibility: 'visible',
                    item,
                };
            }),
        );
    }, [width, set]);

    return {
        items: props,
        bind,
        setIndex,
    };
};

export default useSwipe;
