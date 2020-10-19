import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
// import { PropTypes as MicromagPropTypes } from '@micromag/core';

import styles from './styles.module.scss';

const propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    withoutScroll: PropTypes.bool,
    verticalAlign: PropTypes.oneOf(['top', 'center', 'bottom']),
    className: PropTypes.string,
    children: PropTypes.node,
};

const defaultProps = {
    width: null,
    height: null,
    withoutScroll: false,
    verticalAlign: null,
    className: null,
    children: null,
};

const Scroll = ({ width, height, withoutScroll, verticalAlign, className, children }) => {
    const finalStyle = {
        width,
        height,
    };

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [styles.withScroll]: !withoutScroll,
                    [className]: className !== null,
                    [styles[verticalAlign]]: verticalAlign !== null,
                },
            ])}
            style={finalStyle}
        >
            <div className={styles.inner}>{children}</div>
        </div>
    );
};

Scroll.propTypes = propTypes;
Scroll.defaultProps = defaultProps;

export default Scroll;
