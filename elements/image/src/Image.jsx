/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useState } from 'react';
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
    loadingMode: PropTypes.string,
};

const defaultProps = {
    media: null,
    alt: null,
    width: null,
    height: null,
    objectFit: null,
    containerStyle: {},//
    imageStyle: {},
    className: null,
    imageClassName: null,
    onLoaded: null,
    loadingMode: 'lazy',
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
    loadingMode,
}) => {
    const { url = null, metadata = null } = media || {};
    const { width: mediaWidth = 0, height: mediaHeight = 0, description = 'image' } =
        metadata || {};
    const mediaRatio = mediaWidth / mediaHeight;

    const [realSize, setRealSize] = useState(null);
    const { realWidth = 0, realHeight = 0 } = realSize || {};

    const onImageLoaded = useCallback(
        (e) => {
            const {
                target: { naturalWidth = 0, naturalHeight = 0 },
            } = e;
            setRealSize({ width: naturalWidth, height: naturalHeight });
            if (onLoaded !== null) {
                onLoaded(e);
            }
        },
        [onLoaded],
    );

    const finalMediaWidth = realWidth || mediaWidth || 0;
    const finalMediaHeight = realHeight || mediaHeight || 0;

    const withFit = objectFit !== null;
    const mediaHasSize = finalMediaWidth > 0 && finalMediaHeight > 0;

    let finalContainerStyle;
    let finalImageStyle;

    if (withFit) {
        let imageTop = 0;
        let imageLeft = 0;
        let imageWidth = width;
        let imageHeight = height;
        let imageObjectFit = null;
        let imageObjectPosition = null;

        const { fit = null, horizontalPosition = 'center', verticalPosition = 'center' } =
            objectFit || {};

        if (mediaHasSize) {
            const { width: resizedImageWidth, height: resizedImageHeight } = getSizeWithinBounds(
                finalMediaWidth,
                finalMediaHeight,
                width,
                height,
                {
                    cover: fit === 'cover',
                },
            );

            imageWidth = resizedImageWidth;
            imageHeight = resizedImageHeight;

            if (horizontalPosition === 'center') {
                imageLeft = -(resizedImageWidth - width) / 2;
            } else if (horizontalPosition === 'right') {
                imageLeft = -(resizedImageWidth - width);
            }

            if (verticalPosition === 'center') {
                imageTop = -(resizedImageHeight - height) / 2;
            } else if (verticalPosition === 'bottom') {
                imageTop = -(resizedImageHeight - height);
            }
        } else {
            imageObjectFit = fit;
            imageObjectPosition = `${horizontalPosition} ${verticalPosition}`;
        }

        finalContainerStyle = {
            width,
            height,
        };

        finalImageStyle = {
            position: 'absolute',
            width: imageWidth,
            height: imageHeight,
            top: imageTop,
            left: imageLeft,
            objectFit: imageObjectFit,
            objectPosition: imageObjectPosition,
        };
    } else {
        const validWidth = width !== null && typeof width === 'number';
        const validHeight = height !== null && typeof height === 'number';

        const ratioWidth = validHeight ? height * mediaRatio : null;
        const ratioHeight = validWidth ? width / mediaRatio : null;

        let finalWidth = width !== null ? width : ratioWidth;
        let finalHeight = height !== null ? height : ratioHeight;

        if (finalWidth === null && finalHeight === null) {
            finalWidth = finalMediaWidth > 0 ? mediaWidth : null;
            finalHeight = finalMediaHeight > 0 ? mediaHeight : null;
        }

        finalImageStyle = {
            width: finalWidth,
            height: finalHeight,
        };

        finalContainerStyle = finalImageStyle;
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
            alt={alt || description}
            className={classNames([
                styles.img,
                {
                    [imageClassName]: imageClassName !== null,
                },
            ])}
            style={finalImageStyle}
            onLoad={onImageLoaded}
            loading={loadingMode}
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
