/* eslint-disable react/jsx-props-no-spreading */
import { faArrowDown } from '@fortawesome/free-solid-svg-icons/faArrowDown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useScroll } from '@use-gesture/react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { useResizeObserver } from '@micromag/core/hooks';
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
    contain: PropTypes.bool,
    scrollContainerRef: PropTypes.any, // eslint-disable-line
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
    contain: false,
    scrollContainerRef: null,
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
    contain,
    scrollContainerRef,
}) {
    const finalStyle = {
        width,
        height,
    };

    const [withArrow, setWithArrow] = useState(false);

    const {
        ref: scrollableRef,
        entry: { contentRect: scrollableRect },
    } = useResizeObserver();
    const { height: scrollableHeight } = scrollableRect || {};

    if (scrollContainerRef !== null) {
        scrollContainerRef.current = scrollableRef.current; // eslint-disable-line
    }

    const {
        ref: scrolleeRef,
        entry: { contentRect: scrolleeRect },
    } = useResizeObserver();
    const { height: scrolleeHeight } = scrolleeRect || {};

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

            if (newWithArrow !== withArrow) {
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

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [styles.withScroll]: !disabled,
                    [styles.containOverscroll]: contain,
                    [className]: className !== null,
                    [styles[verticalAlign]]: verticalAlign !== null,
                    [styles.withArrow]: withArrow,
                },
            ])}
            style={finalStyle}
        >
            <div className={styles.scrollable} ref={scrollableRef} {...bind()}>
                <div className={styles.scrollee} ref={scrolleeRef}>
                    {children}
                </div>
            </div>
            {!disabled ? (
                <div className={styles.arrowContainer}>
                    <FontAwesomeIcon className={styles.arrow} icon={faArrowDown} />
                </div>
            ) : null}
        </div>
    );
}

Scroll.propTypes = propTypes;
Scroll.defaultProps = defaultProps;

export default React.forwardRef((props, ref) => <Scroll scrollContainerRef={ref} {...props} />);
