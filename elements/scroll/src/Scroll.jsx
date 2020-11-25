import React, { useState, useCallback, useEffect }  from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useResizeObserver } from '@micromag/core';
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
};

const defaultProps = {
    width: null,
    height: null,
    disabled: false,
    verticalAlign: null,
    className: null,
    children: null,
};

const Scroll = ({ width, height, disabled, verticalAlign, className, children }) => {
    const finalStyle = {
        width,
        height,
    };

    const [withArrow, setWithArrow] = useState(false);
    const onScroll = useCallback( (e) => {
        const scrollableEl = e.currentTarget;
        setWithArrow(scrollableEl.scrollTop < 10);
    }, [setWithArrow]);

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

    useEffect( () => {
        if (scrolleeHeight > 0 && scrollableHeight > 0) {
            setWithArrow(Math.round(scrolleeHeight) > Math.round(scrollableHeight) && !disabled);
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
            <div className={styles.scrollable} ref={scrollableRef} onScroll={ !disabled ? onScroll : null }>
                <div className={styles.scrollee} ref={scrolleeRef}>
                    {children}
                </div>
            </div>
            <div className={styles.arrowContainer}>
                <FontAwesomeIcon className={styles.arrow} icon={faArrowDown} />
            </div>
        </div>
    );
};

Scroll.propTypes = propTypes;
Scroll.defaultProps = defaultProps;

export default Scroll;
