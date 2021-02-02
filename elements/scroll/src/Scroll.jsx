import React, { useState, useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useResizeObserver } from '@micromag/core/hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';

import styles from './styles.module.scss';

const propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    disabled: PropTypes.bool,
    verticalAlign: PropTypes.oneOf(['top', 'middle', 'bottom']),
    className: PropTypes.string,
    children: PropTypes.node,
    onScrolledBottom: PropTypes.func,
};

const defaultProps = {
    width: null,
    height: null,
    disabled: false,
    verticalAlign: null,
    className: null,
    children: null,
    onScrolledBottom: null,
};

const Scroll = ({
    width,
    height,
    disabled,
    verticalAlign,
    className,
    children,
    onScrolledBottom,
}) => {
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

    const {
        ref: scrolleeRef,
        entry: { contentRect: scrolleeRect },
    } = useResizeObserver();
    const { height: scrolleeHeight } = scrolleeRect || {};

    const scrollBottomOnce = useRef(false);
    const onScroll = useCallback(
        (e) => {
            const scrollableEl = e.currentTarget;
            const newWithArrow = scrollableEl.scrollTop < 10;

            if (!scrollBottomOnce.current) {
                const maxScrollAmount = scrolleeHeight - scrollableHeight;
                if (scrollableEl.scrollTop + 10 >= maxScrollAmount) {
                    scrollBottomOnce.current = true;
                    if (onScrolledBottom !== null) {
                        onScrolledBottom();
                    }
                }
            }

            if (newWithArrow !== withArrow) {
                setWithArrow(newWithArrow);
            }
        },
        [withArrow, setWithArrow, scrollableHeight, scrolleeHeight],
    );

    useEffect(() => {
        if (scrolleeHeight > 0 && scrollableHeight > 0 && !disabled) {
            setWithArrow(Math.round(scrolleeHeight) > Math.round(scrollableHeight));
        }
    }, [scrollableHeight, scrolleeHeight, setWithArrow, disabled]);

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [styles.withScroll]: !disabled,
                    [className]: className !== null,
                    [styles[verticalAlign]]: verticalAlign !== null,
                    [styles.withArrow]: withArrow,
                },
            ])}
            style={finalStyle}
        >
            <div
                className={styles.scrollable}
                ref={scrollableRef}
                onScroll={!disabled ? onScroll : null}
            >
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
};

Scroll.propTypes = propTypes;
Scroll.defaultProps = defaultProps;

export default Scroll;
