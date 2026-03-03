/* eslint-disable react/no-array-index-key */
import classNames from 'classnames';
import React from 'react';

import type { ImageElement } from '@micromag/core';
import { useSetting } from '@micromag/core/contexts';
import { getOptimalImageUrl, pascalCase } from '@micromag/core/utils';

import styles from './avatar.module.css';

interface AvatarProps {
    image?: ImageElement;
    width?: number;
    height?: number;
    resolution?: number;
    isTag?: boolean;
    shape?: null | 'tag' | 'circle';
    className?: string;
    shouldLoad?: boolean;
}

function Avatar({
    image = null,
    width = 100,
    height = 100,
    resolution = 1,
    shape = 'circle',
    isTag = false,
    className = null,
    shouldLoad = true,
}) {
    const supportsWebp = useSetting('supportsWebp', false);
    const imageResolution = useSetting('imageResolution', resolution);
    const imageAtSize = getOptimalImageUrl(image, width, height, {
        resolution: imageResolution,
        supportsWebp,
    });
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
}

export default Avatar;
