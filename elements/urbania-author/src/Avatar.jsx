/* eslint-disable react/no-array-index-key */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { getOptimalImageUrl } from '@micromag/core/utils';
import styles from './avatar.module.scss';

const propTypes = {
    image: MicromagPropTypes.imageElement,
    width: PropTypes.number,
    height: PropTypes.number,
    resolution: PropTypes.number,
    isTag: PropTypes.bool,
    shape: PropTypes.oneOf([null, 'tag', 'circle']),
    className: PropTypes.string,
    shouldLoad: PropTypes.bool,
};

const defaultProps = {
    image: null,
    width: 100,
    height: 100,
    resolution: 1,
    isTag: false,
    shape: 'Circle',
    className: null,
    shouldLoad: true,
};

const Avatar = ({ image, width, height, resolution, shape, isTag, className, shouldLoad }) => {
    const imageAtSize = getOptimalImageUrl(image, width, height, { resolution });
    return (
        <span
            className={classNames([
                styles.container,
                {
                    [styles[`shape${shape}`]]: shape !== null,
                    [styles.isTag]: isTag,
                    [className]: className !== null,
                },
            ])}
        >
            <span
                className={styles.shape}
                style={{
                    backgroundImage: shouldLoad ? `url("${imageAtSize}")` : null,
                }}
            />
        </span>
    );
};

Avatar.propTypes = propTypes;
Avatar.defaultProps = defaultProps;

export default Avatar;
