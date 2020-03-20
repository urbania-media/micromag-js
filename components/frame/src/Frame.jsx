import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
// import { PropTypes as MicromagPropTypes } from '@micromag/core';

import styles from './styles.module.scss';

const propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    className: PropTypes.string,
    children: PropTypes.node,
};

const defaultProps = {
    width: null,
    height: null,
    className: null,
    children: null,
};

const Frame = ({ width, height, className, children }) => {
    const finalStyle = {
        width,
        height,
    };
    return (
        <div
            className={classNames([
                styles.container,
                {
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
