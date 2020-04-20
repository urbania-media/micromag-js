import { useRef, useEffect, useCallback } from 'react';
import { useSprings } from 'react-spring';
import clamp from 'lodash/clamp';
import { useDrag } from 'react-use-gesture';

// NOTE: without the animated.div simply do: transform: `translate3d(${x}px, 0, 0)`

export const useSwipe = ({
    width = null,
    items = [],
    display = 'flex',
    threshold = 3,
    disabled = false,
    onIndexChange = null,
}) => {
    const index = useRef(0);
    const currentWidth = width || window.innerWidth;
    const count = items.length;

    const getItem = useCallback((item, x = 0, hidden = false, idx = 0) => {
        return {
            x,
            display: hidden ? 'none' : display,
            visibility: hidden ? 'hidden' : 'visible',
            item,
            zIndex: idx,
        };
    }, []);

    const [itemsWithProps, set] = useSprings(items.length, i => ({
        x: i * currentWidth,
        display: i >= 2 ? 'none' : display,
        visibility: i >= 2 ? 'hidden' : 'visible',
        item: items[i],
        zIndex: i,
    }));

    const bind = useDrag(({ down, movement: [mx], direction: [xDir], distance, cancel }) => {
        if (disabled) {
            return;
        }

        // Block first and last moves
        if (down && index.current === items.length - 1 && xDir < 0) {
            cancel();
        }

        if (down && index.current === 0 && xDir > 0) {
            cancel();
        }

        if (down && distance > currentWidth / threshold) {
            cancel((index.current = clamp(index.current + (xDir > 0 ? -1 : 1), 0, count - 1)));
            if (onIndexChange !== null) {
                onIndexChange(index.current);
            }
        }

        set(
            items.map((item, i) => {
                const x = (i - index.current) * currentWidth + (down ? mx : 0);
                const hidden = i < index.current - 1 || i > index.current + 1;
                return getItem(item, x, hidden, i);
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
            if (onIndexChange !== null) {
                onIndexChange(idx);
            }
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

    return {
        items: itemsWithProps,
        bind,
        indexRef: index,
        setIndex,
    };
};

export default useSwipe;
