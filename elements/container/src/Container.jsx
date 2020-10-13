import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
// import { PropTypes as MicromagPropTypes } from '@micromag/core';

import styles from './styles.module.scss';

const propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    maxRatio: PropTypes.number,
    className: PropTypes.string,
    children: PropTypes.node,
};

const defaultProps = {
    maxRatio: null,
    className: null,
    children: null,
};

const Container = ({ width, height, maxRatio, className, children }) => {
    const currentRatio = width / height;
    const maxWidth = maxRatio !== null && currentRatio > maxRatio ? height * maxRatio : null;

    const containerStyle = {
        width,
        height,
    }

    const innerStyle = {
        width: maxWidth
    };

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
            style={containerStyle}
        >
            <div className={styles.inner} style={innerStyle}>
                {children}
            </div>
        </div>
    );
};

Container.propTypes = propTypes;
Container.defaultProps = defaultProps;

export default Container;
