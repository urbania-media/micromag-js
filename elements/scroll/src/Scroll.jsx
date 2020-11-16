import React, { useState, useCallback }  from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
// import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';

import styles from './styles.module.scss';

const propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    disabled: PropTypes.bool,
    verticalAlign: PropTypes.oneOf(['top', 'center', 'bottom']),
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

    const [scrolled, setScrolled] = useState(false);
    const onScroll = useCallback( () => {
        setScrolled(true);
    }, [setScrolled]);

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [styles.withScroll]: !disabled,
                    [className]: className !== null,
                    [styles[verticalAlign]]: verticalAlign !== null,
                    [styles.scrolled]: scrolled,
                },
            ])}
            style={finalStyle}
        >
            <div className={styles.inner} onScroll={ !scrolled ? onScroll : null }>
                <div className={styles.content}>
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
