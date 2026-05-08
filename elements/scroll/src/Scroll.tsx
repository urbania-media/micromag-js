import { useScroll } from '@use-gesture/react';
import classNames from 'classnames';
import { ForwardedRef, ReactNode, useEffect, useRef, useState } from 'react';

import { useDimensionObserver } from '@micromag/core/hooks';
import { mergeRefs } from '@micromag/core/utils';

import styles from './styles.module.css';

interface ScrollProps {
    width?: number | null;
    height?: number | null;
    disabled?: boolean;
    verticalAlign?: 'top' | 'middle' | 'bottom' | null;
    className?: string | null;
    scrollableClassName?: string | null;
    scrolleeClassName?: string | null;
    children?: ReactNode | null;
    scrollPosition?: number | null;
    triggers?: number[];
    onScrolledTrigger?: ((...args: unknown[]) => void) | null;
    onScrolledBottom?: ((...args: unknown[]) => void) | null;
    onScrolledNotBottom?: ((...args: unknown[]) => void) | null;
    onScrollHeightChange?: ((...args: unknown[]) => void) | null;
    ref?: ForwardedRef<HTMLDivElement> | null;
    withShadow?: boolean;
    withArrow?: boolean;
}

function Scroll({
    width = null,
    height = null,
    disabled = false,
    verticalAlign = null,
    className = null,
    scrollableClassName = null,
    scrolleeClassName = null,
    children = null,
    scrollPosition = null,
    triggers = [0.1, 0.25, 0.5, 0.75, 0.9, 1.0],
    onScrolledTrigger = null,
    onScrolledBottom = null,
    onScrolledNotBottom = null,
    onScrollHeightChange = null,
    ref: scrollContainerRef = null,
    withShadow = false,
    withArrow: showArrow = true,
}: ScrollProps) {
    const finalStyle = {
        width,
        height,
    };

    const triggersCompletedRef = useRef([]);
    const [withArrow, setWithArrow] = useState(false);
    const { ref: scrollableRef, height: scrollableHeight } = useDimensionObserver();
    const { ref: scrolleeRef, height: scrolleeHeight } = useDimensionObserver();

    const scrolledBottomOnceRef = useRef(false);
    const scrolledNotBottomOnceRef = useRef(false);
    const reachedBottomRef = useRef(false);
    const onScroll = ({ xy: [, scrollY] }) => {
        const newWithArrow = scrollY <= 1;

        const maxScrollAmount = scrolleeHeight - scrollableHeight;

        const nowReachedBottom = scrollY + 1 >= maxScrollAmount;

        const progress = Math.min(Math.max((scrollY + 1) / maxScrollAmount, 0), 1);

        const newTriggersCompleted = (triggers || []).filter(
            (step) => progress >= step && triggersCompletedRef.current.indexOf(step) === -1,
        );

        newTriggersCompleted.forEach((step) => {
            if (onScrolledTrigger != null) {
                // console.log('call me', step, progress);
                onScrolledTrigger(step);
            }
        });

        if (newTriggersCompleted.length > 0) {
            triggersCompletedRef.current = [
                ...triggersCompletedRef.current,
                ...newTriggersCompleted,
            ];
        }

        if (nowReachedBottom) {
            if (!reachedBottomRef.current) {
                if (onScrolledBottom !== null) {
                    onScrolledBottom({ initial: !scrolledBottomOnceRef.current });
                }
                scrolledBottomOnceRef.current = true;
            }
        } else if (reachedBottomRef.current) {
            if (onScrolledNotBottom !== null) {
                onScrolledNotBottom({ initial: !scrolledNotBottomOnceRef.current });
            }
            scrolledNotBottomOnceRef.current = true;
        }

        if (newWithArrow !== withArrow && showArrow) {
            setWithArrow(newWithArrow);
        }

        reachedBottomRef.current = nowReachedBottom;
    };
    const bind = useScroll(onScroll, {
        enabled: !disabled,
        threshold: 10,
        axis: 'y',
        filterTaps: true,
    });

    // need to call scrolled callbacks on initial render also

    const shouldShowArrow =
        !disabled &&
        scrolleeHeight > 0 &&
        scrollableHeight > 0 &&
        Math.round(scrolleeHeight) > Math.round(scrollableHeight);
    if (shouldShowArrow !== withArrow) {
        setWithArrow(shouldShowArrow);
    }

    const maxScrollAmount =
        scrolleeHeight > 0 && scrollableHeight > 0 ? scrolleeHeight - scrollableHeight : null;
    useEffect(() => {
        const nowReachedBottom =
            maxScrollAmount !== null &&
            !disabled &&
            scrollableRef.current.scrollTop + 1 >= maxScrollAmount;
        if (nowReachedBottom) {
            if (onScrolledBottom !== null) {
                onScrolledBottom({ initial: false });
            }
        } else if (onScrolledNotBottom !== null) {
            onScrolledNotBottom({ initial: false });
        }
    }, [maxScrollAmount, disabled, scrollableRef, onScrolledBottom, onScrolledNotBottom]);

    useEffect(() => {
        if (onScrollHeightChange !== null) {
            const canScroll = (scrolleeHeight || 0) > (scrollableHeight || 0);
            onScrollHeightChange({ scrollableHeight, scrolleeHeight, canScroll });
        }
    }, [scrollableHeight, scrolleeHeight, onScrollHeightChange]);

    useEffect(() => {
        if (scrollableRef.current !== null && scrollPosition !== null) {
            scrollableRef.current.scrollTop = scrollPosition;
        }
    }, [scrollableRef, scrollPosition]);

    console.log({
        scrollableHeight,
        scrolleeHeight,
        maxScrollAmount,
        withArrow,
    });

    return (
        <div
            className={classNames([
                styles.container,
                styles.withScroll,
                className,
                {
                    [styles.disabled]: disabled,
                    [styles[verticalAlign]]:
                        verticalAlign !== null && scrolleeHeight < scrollableHeight,
                    [styles.withArrow]: showArrow && withArrow,
                    [styles.withShadow]: withShadow,
                },
            ])}
            style={finalStyle}
        >
            <div
                className={classNames([styles.scrollable, scrollableClassName])}
                ref={mergeRefs(scrollableRef, scrollContainerRef)}
                {...bind()}
            >
                <div
                    className={classNames([styles.scrollee, scrolleeClassName])}
                    ref={scrolleeRef as ForwardedRef<HTMLDivElement>}
                >
                    {children}
                </div>
            </div>
            {!disabled && showArrow ? (
                <div className={styles.arrowContainer}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="10"
                        height="16"
                        viewBox="0 0 10 16"
                        className={styles.arrow}
                        fill="currentColor"
                    >
                        <polygon
                            // stroke="#000"
                            // strokeWidth="0.5"
                            points=".38 11.38 5 16 9.62 11.38 8.56 10.32 5.75 13.13 5.75 1.61 4.25 1.61 4.25 13.13 1.44 10.32 .38 11.38"
                        />
                    </svg>
                </div>
            ) : null}
        </div>
    );
}

export default Scroll;
