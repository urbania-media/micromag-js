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
    width: '100%',
    height: '100%',
    withScroll: false,
    className: null,
    children: null,
};

const Frame = ({ width, height, withScroll, className, children }) => {
    const finalStyle = {
        width,
        height,
    };
    return (
        <div
            className={classNames([
                styles.container,
                {
                    [styles.withScroll]: withScroll !== null,
                    [className]: className !== null,
                },
            ])}
            style={finalStyle}
        >
            {children}
        </div>
    );
};

Frame.propTypes = propTypes;
Frame.defaultProps = defaultProps;

export default Frame;
