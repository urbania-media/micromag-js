import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
// import { PropTypes as MicromagPropTypes } from '@micromag/core';

import styles from './styles.module.scss';

const propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    maxRatio: PropTypes.number,
    withScroll: PropTypes.bool,
    className: PropTypes.string,
    children: PropTypes.node,
};

const defaultProps = {
    maxRatio: null,
    withScroll: false,
    className: null,
    children: null,
};

const Container = ({
    width,
    height,
    maxRatio,
    withScroll,
    className,
    children,
}) => {
    const currentRatio = width / height;
    const maxWidth = maxRatio !== null && currentRatio > maxRatio ? Math.round(height * maxRatio) : null;
    const landscape = width > height;
    const landscapeWithScroll = landscape && withScroll;

    const containerStyle = {
        width: maxWidth,
        height: landscapeWithScroll ? null : height,
        minHeight: landscapeWithScroll ? height : null,
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
            { children }
        </div>
    );
};

Container.propTypes = propTypes;
Container.defaultProps = defaultProps;

export default Container;
