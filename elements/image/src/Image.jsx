/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { getSizeWithinBounds } from '@folklore/size';

import styles from './styles.module.scss';

const propTypes = {
    media: MicromagPropTypes.imageMedia,
    alt: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    objectFit: MicromagPropTypes.objectFit,
    containerStyle: MicromagPropTypes.containerStyle,
    imageStyle: MicromagPropTypes.containerStyle,
    className: PropTypes.string,
    imageClassName: PropTypes.string,
    onLoaded: PropTypes.func,
};

const defaultProps = {
    media: null,
    alt: 'image',
    width: null,
    height: null,
    objectFit: null,
    containerStyle: {},
    imageStyle: {},
    className: null,
    imageClassName: null,
    onLoaded: null,
};

const Image = ({
    media,
    alt,
    width,
    height,
    objectFit,
    containerStyle,
    imageStyle,
    className,
    imageClassName,
    onLoaded,
}) => {
    const { url = null, metadata = null } = media || {};
    const { width: mediaWidth = 0, height: mediaHeight = 0 } = metadata || {};
    const mediaRatio = mediaWidth / mediaHeight;

    const withFit = objectFit !== null;

    let finalContainerStyle;
    let finalImageStyle;

    if (withFit) {
        const {
            fit = null,
            horizontalPosition = 'center',
            verticalPosition = 'center',
        } = objectFit || {};
        const {
            width: resizedImageWidth,
            height: resizedImageHeight,
        } = getSizeWithinBounds(mediaWidth, mediaHeight, width, height, { cover: fit === 'cover' });

        let imageTop;
        let imageLeft;

        if (horizontalPosition === 'center') {
            imageLeft = -(resizedImageWidth - width) / 2;
        } else if (horizontalPosition === 'right') {
            imageLeft = -(resizedImageWidth - width);
        } else {
            imageLeft = 0;
        }

        if (verticalPosition === 'center') {
            imageTop = -(resizedImageHeight - height) / 2;
        } else if (verticalPosition === 'bottom') {
            imageTop = -(resizedImageHeight - height);
        } else {
            imageTop = 0;
        }

        finalContainerStyle = {
            width,
            height,
        };

        finalImageStyle = {
            position: 'absolute',
            width: resizedImageWidth,
            height: resizedImageHeight,
            top: imageTop,
            left: imageLeft,
        };
    } else {
        const validWidth = width !== null && typeof width === 'number';
        const validHeight = height !== null && typeof height === 'number';

        const ratioWidth = validHeight ? height * mediaRatio : null;
        const ratioHeight = validWidth ? width / mediaRatio : null;

        finalImageStyle = {
            width: width !== null ? width : ratioWidth,
            height: height !== null ? height : ratioHeight,
        };
    }

    finalContainerStyle = {
        ...finalContainerStyle,
        ...containerStyle,
    };

    finalImageStyle = {
        ...finalImageStyle,
        ...imageStyle,
    };

    const img = url ? (
        <img
            src={url}
            alt={alt}
            className={classNames([
                styles.img,
                {
                    [imageClassName]: imageClassName !== null,
                },
            ])}
            style={finalImageStyle}
            onLoad={onLoaded}
        />
    ) : null;

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
            style={finalContainerStyle}
        >
            {img}
        </div>
    );
};

Image.propTypes = propTypes;
Image.defaultProps = defaultProps;

export default Image;
