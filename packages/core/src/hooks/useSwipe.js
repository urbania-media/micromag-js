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
    onSwipeCancel = null,
    onTap = null,
}) => {
    const swipingIndex = useRef(null);
    const index = useRef(0);
    const lockedAxis = useRef(null);

    const currentWidth = width || window.innerWidth;
    const count = items.length;

    const getItem = useCallback((item, x = 0, y = 0, idx = 0, scale = 1) => {
        return {
            x,
            y,
            item,
            zIndex: idx,
            scale
        };
    });

    const getItems = useCallback(
        ({ down = false, mx = 0, my = 0 } = {}) => {
            return items.map((item, i) => {
                const x = disabled ? 0 : (i - index.current) * currentWidth + (down ? mx : 0);
                const scale = disabled || !down ? 1 : 1 - Math.max(Math.abs(mx), my) / currentWidth / 2;
                // const hidden =
                //     !disabled && (i < index.current - range || i > index.current + range);
                return getItem(item, x, 0, i, scale);
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
        ({ down, movement: [mx, my], direction: [xDir], delta: [xDelta], cancel, tap }) => {

            if (disabled) {
                cancel();
                return;
            }

            if (!down && swipingIndex.current === index.current) {
                lockedAxis.current = null;
                if (onSwipeCancel !== null) {
                    onSwipeCancel(index.current);
                }                
            }

            // Block first and last moves
            /*
            if (down && index.current === items.length - 1 && xDir < 0) {
                cancel();
                return;
            }

            if (down && index.current === 0 && xDir > 0) {
                cancel();
                return;
            }
            */

            const distanceX = lockedAxis.current === 'x' ? mx : 0;
            const distanceY = lockedAxis.current === 'y' ? my : 0;

            if (
                down && // Cursor down
                (Math.abs(distanceX) > currentWidth / threshold // Pure distance
                )//    (Math.abs(xDelta) > 12 && Math.abs(distanceX) > currentWidth / 12)) // Speedy flick, 12 spped and 1/12 of the screen size
            ) {
                cancel((index.current = clamp(index.current + (xDir > 0 ? -1 : 1), 0, count - 1)));
                lockedAxis.current = null;
                if (onSwipeEnd !== null) {
                    onSwipeEnd(index.current);
                }
                return;
            }

            set(getItems({ down, mx: distanceX, my: distanceY }));

            // saving current swiping index in a ref in order to have a section called only once when swipe just started or a tap was detected
            if (swipingIndex.current !== index.current) {
                if (down && !tap) {
                    if (onSwipeStart !== null ) {
                        onSwipeStart(index.current);
                    }
                }
                if (!down && tap) {
                    if (onTap !== null) {
                        onTap();
                    }                    
                }
            }

            // lock swiping on axis from initial 3 pixels distance (Y axis requires to swipe down)
            if (down && lockedAxis.current === null) {
                const distX = Math.abs(mx);
                const distY = Math.abs(my);
                if (distX !== distY && (my > 2 || distX > 2)) {
                    lockedAxis.current = my > distX ? 'y' : 'x';
                }                
            }
            
            swipingIndex.current = down && !tap ? index.current : null;
        }, { filterTaps: true }
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
        index: index.current,
        setIndex,
    };
};

export default useSwipe;
