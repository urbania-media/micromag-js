import { useRef, useEffect, useCallback } from 'react';
import { useSpring, useSprings } from 'react-spring';
import clamp from 'lodash/clamp';
import { useDrag } from 'react-use-gesture';

export const useSwipe = ({
    width = null,
    height = null,
    items = [],
    withSpring = true,
    swipeWidthThreshold = 3,
    swipeHeightThreshold = 6,
    disabled = false,
    onSwipeStart = null,
    onSwipeEnd = null,
    onSwipeCancel = null,
    onTap = null,
}) => {
    const swipingIndex = useRef(null);
    const index = useRef(0);
    const menuOpened = useRef(false);
    const lockedAxis = useRef(null);

    const currentWidth = width || window.innerWidth;
    const currentHeight = height || window.innerHeight;

    const count = items.length;

    const getItem = useCallback((x = 0, idx = 0, scale = 1) => {
        return {
            x,
            zIndex: idx,
            scale
        };
    });

    const getItems = useCallback(
        ({ down = false, mx = 0 } = {}) => {
            return items.map((item, i) => {
                const x = disabled ? 0 : (i - index.current) * currentWidth + (down ? mx : 0);
                const scale = disabled || !down ? 1 : 1 - Math.abs(mx) / currentWidth / 2;
                return getItem(x, i, scale);
            });
        },
        [disabled, items, index, currentWidth],
    );

    const getMenu = useCallback(
        ({ my = 0 } = {}) => {
            return {
                y: disabled ? 0 : clamp(my + (menuOpened.current ? currentHeight : 0), 0, currentHeight)
            }
        },
        [disabled, currentHeight]
    );

    // Initial items state
    const [itemsWithProps, set] = useSprings(
        items.length,
        i => ({
            x: disabled ? 0 : i * currentWidth,
            y: 0,
            zIndex: i,
            config: {
                ...(!withSpring ? { duration: 1 } : null),
            },
        })
    );
    
    // Initial menu state
    const [menuProps, setMenu] = useSpring(
        () => ({
            y: 0,
            config: {
                ...(!withSpring ? { duration: 1 } : null),
            },
        })
    );

    const bind = useDrag(
        ({ down, movement: [mx, my], direction: [xDir], cancel, tap }) => {

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

            const movementX = lockedAxis.current === 'x' ? mx : 0;
            const movementY = lockedAxis.current === 'y' ? my : 0;

            if (down) {
                // Snap to next slide
                if (!menuOpened.current && Math.abs(movementX) > currentWidth / swipeWidthThreshold) {
                    index.current = clamp(index.current + (xDir > 0 ? -1 : 1), 0, count - 1);
                    lockedAxis.current = null;
                    cancel();
                    if (onSwipeEnd !== null) {
                        onSwipeEnd(index.current);
                    }
                    return;
                }

                // Snap to closed/menuOpened menu
                if (menuOpened.current) {
                    if (movementY < - currentHeight / swipeHeightThreshold) {
                        menuOpened.current = false;
                        cancel();
                        return;
                    }
                } else if (movementY > currentHeight / swipeHeightThreshold) {
                    menuOpened.current = true;
                    cancel();
                    return;
                }
            }

            set(getItems({ down, mx: movementX, my: movementY }));
            setMenu(getMenu({ my: movementY }));

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
                const distanceX = Math.abs(mx);
                const distanceY = Math.abs(my);
                if (distanceX !== distanceY && ((menuOpened.current ? my < -2 : my > 2) || distanceX > 2)) {
                    lockedAxis.current = distanceY > distanceX ? 'y' : 'x';
                }                
            }
            
            swipingIndex.current = down && !tap ? index.current : null;
        }, { filterTaps: true }
    );

    const reset = useCallback(() => {
        set(getItems());
        setMenu(getMenu());
    }, [disabled, items, index, currentWidth]);

    const setIndex = useCallback(
        idx => {
            index.current = idx;
            reset();
        },
        [reset],
    );

    const setMenuOpened = useCallback(
        o => {
            menuOpened.current = o !== undefined ? o : !menuOpened.current;
            reset();
        },
        [reset]
    );

    // Reset on resize or others
    useEffect(() => {
        set(getItems());
        setMenu(getMenu());
    }, [items, width, height, set, setMenu, disabled]);

    return {
        items: itemsWithProps,
        menu: menuProps,
        bind,
        index: index.current,
        menuOpened: menuOpened.current,
        setIndex,
        setMenuOpened
    };
};

export default useSwipe;
