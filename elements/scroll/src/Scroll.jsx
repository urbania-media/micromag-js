/* eslint-disable react/jsx-props-no-spreading */
import { useScroll } from '@use-gesture/react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';

import { useDimensionObserver } from '@micromag/core/hooks';

import styles from './styles.module.scss';

const propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    disabled: PropTypes.bool,
    verticalAlign: PropTypes.oneOf(['top', 'middle', 'bottom']),
    className: PropTypes.string,
    children: PropTypes.node,
    onScrolledBottom: PropTypes.func,
    onScrolledNotBottom: PropTypes.func,
    onScrollHeightChange: PropTypes.func,
    contain: PropTypes.bool,
    scrollContainerRef: PropTypes.any, // eslint-disable-line
    withShadow: PropTypes.bool,
    withArrow: PropTypes.bool,
};

const defaultProps = {
    width: null,
    height: null,
    disabled: false,
    verticalAlign: null,
    className: null,
    children: null,
    onScrolledBottom: null,
    onScrolledNotBottom: null,
    onScrollHeightChange: null,
    contain: false,
    scrollContainerRef: null,
    withShadow: false,
    withArrow: true,
};

function Scroll({
    width,
    height,
    disabled,
    verticalAlign,
    className,
    children,
    onScrolledBottom,
    onScrolledNotBottom,
    onScrollHeightChange,
    contain,
    scrollContainerRef,
    withShadow,
    withArrow: showArrow,
}) {
    const finalStyle = {
        width,
        height,
    };

    const [withArrow, setWithArrow] = useState(false);

    const { ref: scrollableRef, height: scrollableHeight } = useDimensionObserver();

    if (scrollContainerRef !== null) {
        scrollContainerRef.current = scrollableRef.current; // eslint-disable-line
    }

    const { ref: scrolleeRef, height: scrolleeHeight } = useDimensionObserver();

    const scrolledBottomOnce = useRef(false);
    const scrolledNotBottomOnce = useRef(false);
    const reachedBottom = useRef(false);
    const bind = useScroll(
        ({ xy: [, scrollY] }) => {
            const newWithArrow = scrollY <= 1;

            const maxScrollAmount = scrolleeHeight - scrollableHeight;

            const nowReachedBottom = scrollY + 1 >= maxScrollAmount;

            if (nowReachedBottom) {
                if (!reachedBottom.current) {
                    if (onScrolledBottom !== null) {
                        onScrolledBottom({ initial: !scrolledBottomOnce.current });
                    }
                    scrolledBottomOnce.current = true;
                }
            } else if (reachedBottom.current) {
                if (onScrolledNotBottom !== null) {
                    onScrolledNotBottom({ initial: !scrolledNotBottomOnce.current });
                }
                scrolledNotBottomOnce.current = true;
            }

            if (newWithArrow !== withArrow && showArrow) {
                setWithArrow(newWithArrow);
            }
            reachedBottom.current = nowReachedBottom;
        },
        { enabled: !disabled },
    );

    // need to call scrolled callbacks on initial render also

    useEffect(() => {
        if (scrolleeHeight > 0 && scrollableHeight > 0 && !disabled) {
            setWithArrow(Math.round(scrolleeHeight) > Math.round(scrollableHeight));
            const maxScrollAmount = scrolleeHeight - scrollableHeight;
            const nowReachedBottom = scrollableRef.current.scrollTop + 1 >= maxScrollAmount;
            if (nowReachedBottom) {
                if (onScrolledBottom !== null) {
                    onScrolledBottom({ initial: false });
                }
            } else if (onScrolledNotBottom !== null) {
                onScrolledNotBottom({ initial: false });
            }
        }
    }, [scrollableHeight, scrolleeHeight, setWithArrow, disabled]);

    useEffect(() => {
        if (onScrollHeightChange !== null) {
            const canScroll = (scrolleeHeight || 0) > (scrollableHeight || 0);
            onScrollHeightChange({ scrollableHeight, scrolleeHeight, canScroll });
        }
    }, [scrollableHeight, scrolleeHeight, onScrollHeightChange]);

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [styles.withScroll]: !disabled,
                    [styles.containOverscroll]: contain,
                    [className]: className !== null,
                    [styles[verticalAlign]]: verticalAlign !== null,
                    [styles.withArrow]: showArrow && withArrow,
                    [styles.withShadow]: withShadow,
                },
            ])}
            style={finalStyle}
        >
            <div className={styles.scrollable} ref={scrollableRef} {...bind()}>
                <div className={styles.scrollee} ref={scrolleeRef}>
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
                        <polygon points=".38 11.38 5 16 9.62 11.38 8.56 10.32 5.75 13.13 5.75 1.61 4.25 1.61 4.25 13.13 1.44 10.32 .38 11.38" />
                    </svg>
                </div>
            ) : null}
        </div>
    );
}

Scroll.propTypes = propTypes;
Scroll.defaultProps = defaultProps;

export default React.forwardRef((props, ref) => <Scroll scrollContainerRef={ref} {...props} />);
