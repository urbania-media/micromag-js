import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
// import { PropTypes as MicromagPropTypes } from '@micromag/core';

import styles from './styles.module.scss';

const propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    withScroll: PropTypes.bool,
    className: PropTypes.string,
    children: PropTypes.node,
};

const defaultProps = {
    width: null,
    height: null,
    withScroll: true,
    className: null,
    children: null,
};

const Scroll = ({ width, height, withScroll, className, children }) => {
    const finalStyle = {
        width,
        height,
    };
    return (
        <div
            className={classNames([
                styles.container,
                {
                    [styles.withScroll]: withScroll === true,
                    [className]: className !== null,
                },
            ])}
            style={finalStyle}
        >
            {children}
        </div>
    );
};

Scroll.propTypes = propTypes;
Scroll.defaultProps = defaultProps;

export default Scroll;
