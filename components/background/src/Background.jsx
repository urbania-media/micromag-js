import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { getStyleFromColor } from '@micromag/core/utils';

import styles from './styles.module.scss';

const propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    color: MicromagPropTypes.color,
    image: MicromagPropTypes.image,
    className: PropTypes.string,
    children: PropTypes.node,
};

const defaultProps = {
    width: null,
    height: null,
    color: null,
    image: null,
    className: null,
    children: null,
};

const Background = ({ width, height, color, image, className, children }) => {
    let containerStyle = {};
    let finalStyle = {
        width,
        height,
    };

    if (color !== null) {
        finalStyle = {
            ...finalStyle,
            ...getStyleFromColor(color, 'backgroundColor'),
        };
        containerStyle = {
            ...getStyleFromColor(color, 'backgroundColor'),
        };
    }
    if (image !== null) {
        finalStyle = {
            ...finalStyle,
            backgroundImage: `url("${image.url}")`,
        };
    }
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
            <div className={styles.inner} style={finalStyle}>
                {children}
            </div>
        </div>
    );
};

Background.propTypes = propTypes;
Background.defaultProps = defaultProps;

export default Background;
