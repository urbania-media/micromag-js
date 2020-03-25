/* eslint-disable react/no-array-index-key, react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Background from '@micromag/component-background';
import Image from '@micromag/component-image';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { useScreenSize } from '@micromag/core/contexts';

import styles from './slideshow.module.scss';

const propTypes = {
    images: MicromagPropTypes.images,
    background: MicromagPropTypes.backgroundComponent,
    className: PropTypes.string,
};

const defaultProps = {
    images: [],
    background: null,
    className: null,
};

const Slideshow = ({ background, images, className }) => {
    const { width, height } = useScreenSize();
    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className,
                },
            ])}
        >
            <div className={styles.images}>
                {images.map(item => (
                    <Image key={item.id} {...item} />
                ))}
            </div>
            <Background
                {...background}
                width={width}
                height={height}
                className={styles.background}
            />
        </div>
    );
};

Slideshow.propTypes = propTypes;
Slideshow.defaultProps = defaultProps;

export default Slideshow;
