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
    isTag: PropTypes.bool,
    shape: PropTypes.oneOf([null, 'tag', 'circle']),
    className: PropTypes.string,
};

const defaultProps = {
    image: null,
    width: 100,
    height: 100,
    isTag: false,
    shape: 'Circle',
    className: null,
};

const Avatar = ({ image, width, height, shape, isTag, className }) => {
    const imageAtSize = getOptimalImageUrl(image, width, height);

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
                    backgroundImage: `url("${imageAtSize}")`,
                }}
            />
        </span>
    );
};

Avatar.propTypes = propTypes;
Avatar.defaultProps = defaultProps;

export default Avatar;
