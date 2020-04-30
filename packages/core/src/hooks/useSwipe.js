import { useRef, useEffect, useCallback } from 'react';
import { useSprings } from 'react-spring';
import clamp from 'lodash/clamp';
import { useDrag } from 'react-use-gesture';

export const useSwipe = ({
    width = null,
    height = null,
    items = [],
    withSpring = true,
    threshold = 3,
    // range = 2,
    disabled = false,
    onSwipeStart = null,
    onSwipeEnd = null,
}) => {
    const index = useRef(0);
    const currentWidth = width || window.innerWidth;
    const count = items.length;

    const getItem = useCallback((item, x = 0, y = 0, idx = 0) => {
        return {
            x,
            y,
            item,
            zIndex: idx,
        };
    });

    const getItems = useCallback(
        ({ down = 0, mx = 0 } = {}) => {
            return items.map((item, i) => {
                const x = disabled ? 0 : (i - index.current) * currentWidth + (down ? mx : 0);
                // const hidden =
                //     !disabled && (i < index.current - range || i > index.current + range);
                return getItem(item, x, 0, i);
            });
        },
        [disabled, items, index, currentWidth],
    );

    // Initial state
    const [itemsWithProps, set] = useSprings(
        items.length,
        i => ({
            x: disabled ? 0 : i * currentWidth,
            // display: !disabled && i >= range ? 'none' : display,
            // visibility: !disabled && i >= range ? 'hidden' : 'visible',
            item: items[i],
            zIndex: i,
            config: {
                ...(!withSpring ? { duration: 1 } : null),
            },
        }),
        [items],
    );

    const bind = useDrag(
        ({ down, movement: [mx], direction: [xDir, yDir], distance, delta: [xDelta], cancel }) => {
            if (disabled) {
                cancel();
                return;
            }

            // Block first and last moves
            if (down && index.current === items.length - 1 && xDir < 0) {
                cancel();
                return;
            }

            if (down && index.current === 0 && xDir > 0) {
                cancel();
                return;
            }

            if (
                down && // Cursor down
                Math.abs(yDir) < 0.95 && // Avoid swipes up and down
                (distance > currentWidth / threshold || // Pure distance
                    (Math.abs(xDelta) > 12 && distance > currentWidth / 12)) // Speedy flick, 12 spped and 1/12 of the screen size
            ) {
                cancel((index.current = clamp(index.current + (xDir > 0 ? -1 : 1), 0, count - 1)));
                if (onSwipeEnd !== null) {
                    onSwipeEnd(index.current);
                }
                return;
            }

            set(getItems({ down, mx }));

            if (onSwipeStart !== null) {
                onSwipeStart(index.current);
            }
        },
    );

    const reset = useCallback(() => {
        set(getItems());
    }, [disabled, items, index, currentWidth]);

    const setIndex = useCallback(
        idx => {
            // if (onSwipeEnd !== null) {
            //     onSwipeEnd(idx);
            // }
            index.current = idx;
            reset();
        },
        [reset],
    );

    // Reset on resize or others
    useEffect(() => {
        set(getItems());
    }, [items, width, height, set, disabled]);

    return {
        items: itemsWithProps,
        bind,
        indexRef: index,
        setIndex,
    };
};

export default useSwipe;
