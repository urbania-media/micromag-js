/* eslint-disable react/no-array-index-key */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { useSetting } from '@micromag/core/contexts';
import { getOptimalImageUrl, pascalCase } from '@micromag/core/utils';

import styles from './avatar.module.css';

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

const Avatar = ({ image = null, width = 100, height = 100, resolution = 1, shape = 'circle', isTag = false, className = null, shouldLoad = true }) => {
    const supportsWebp = useSetting('supportsWebp', false);
    const imageResolution = useSetting('imageResolution', resolution);
    const imageAtSize = getOptimalImageUrl(image, width, height, { resolution: imageResolution, supportsWebp });
    const finalShape = shape !== null ? pascalCase(shape) : null;
    return (
        <span
            className={classNames([
                styles.container,
                {
                    [styles[`shape${finalShape}`]]: finalShape !== null,
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

export default Avatar;
