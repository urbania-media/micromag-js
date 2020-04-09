import { useRef, useState, useEffect, useCallback } from 'react';
import clamp from 'lodash/clamp';
import { useDrag } from 'react-use-gesture';

export const useSwipe = ({ width = null, items = [], display = 'flex', threshold = 3 }) => {
    const index = useRef(0);
    const currentWidth = width || window.innerWidth;
    const count = items.length;

    const getItem = useCallback((item, x: 0, hidden = false) => {
        if (hidden) {
            return {
                transform: `translate3d(${x}px, 0, 0)`,
                display: 'none',
                visibility: 'hidden',
                item,
            };
        }
        return {
            transform: `translate3d(${x}px, 0, 0)`,
            display,
            visibility: 'visible',
            item,
        };
    }, []);

    const [itemsWithProps, set] = useState(
        items.map((item, i) => ({
            transform: `translate3d(${i * currentWidth}px, 0, 0)`,
            display,
            visibility: 'visible',
            item,
        })),
    );

    const bind = useDrag(({ down, movement: [mx], direction: [xDir], distance, cancel }) => {
        // Block first and last moves
        if (down && index.current === items.length - 1 && xDir < 0) {
            cancel();
        }

        if (down && index.current === 0 && xDir > 0) {
            cancel();
        }

        if (down && distance > currentWidth / threshold) {
            cancel((index.current = clamp(index.current + (xDir > 0 ? -1 : 1), 0, count - 1)));
        }

        set(
            items.map((item, i) => {
                const x = (i - index.current) * currentWidth + (down ? mx : 0);
                const hidden = i < index.current - 1 || i > index.current + 1;
                return getItem(item, x, hidden);
            }),
        );
    });

    const reset = useCallback(() => {
        set(
            items.map((item, i) => {
                const x = (i - index.current) * currentWidth;
                const hidden = i < index.current - 1 || i > index.current + 1;
                return getItem(item, x, hidden);
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
                const x = (i - index.current) * currentWidth;
                const hidden = i < index.current - 1 || i > index.current + 1;
                return getItem(item, x, hidden);
            }),
        );
    }, [width, set]);

    console.log('ok...', currentWidth, itemsWithProps);

    return {
        items: itemsWithProps,
        bind,
        index: index.current,
        setIndex,
    };
};

export default useSwipe;
