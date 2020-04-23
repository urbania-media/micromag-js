import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
// import { PropTypes as MicromagPropTypes } from '@micromag/core';

import styles from './styles.module.scss';

const propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    withScroll: PropTypes.bool,
    visible: PropTypes.bool,
    className: PropTypes.string,
    children: PropTypes.node,
};

const defaultProps = {
    width: '100%',
    height: '100%',
    withScroll: false,
    visible: true,
    className: null,
    children: null,
};

const Frame = ({ width, height, visible, withScroll, className, children }) => {
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
            {visible ? children : null}
        </div>
    );
};

Frame.propTypes = propTypes;
Frame.defaultProps = defaultProps;

export default Frame;
