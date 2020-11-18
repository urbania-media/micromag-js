import React, { useRef, useState, useCallback, useEffect }  from 'react';
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
    hideArrow: PropTypes.bool,
    verticalAlign: PropTypes.oneOf(['top', 'center', 'bottom']),
    className: PropTypes.string,
    children: PropTypes.node,
};

const defaultProps = {
    width: null,
    height: null,
    disabled: false,
    hideArrow: false,
    verticalAlign: null,
    className: null,
    children: null,
};

const Scroll = ({ width, height, disabled, hideArrow, verticalAlign, className, children }) => {
    const finalStyle = {
        width,
        height,
    };

    const [withArrow, setWithArrow] = useState(false);
    const onScroll = useCallback( () => {
        setWithArrow(false);
    }, [setWithArrow]);

    const {
        ref: scrollableRef,
        entry: { contentRect },
    } = useResizeObserver();
    const { height: scrollableHeight } = contentRect || {};

    const scrolleeRef = useRef(null);

    useEffect( () => {
        if (scrolleeRef.current !== null && scrollableHeight > 0) {
            setWithArrow(Math.round(scrolleeRef.current.offsetHeight) > Math.round(scrollableHeight) && !hideArrow);
        }
    }, [scrollableHeight, setWithArrow, hideArrow]);

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
            <div className={styles.scrollable} ref={scrollableRef} onScroll={ withArrow ? onScroll : null }>
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
