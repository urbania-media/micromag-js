/* eslint-disable react/jsx-props-no-spreading */
import { getSizeWithinBounds } from '@folklore/size';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { getOptimalImageUrl } from '@micromag/core/utils';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback, useState, useRef } from 'react';
import styles from './styles.module.scss';

const propTypes = {
    media: MicromagPropTypes.imageMedia,
    alt: PropTypes.string,
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    resolution: PropTypes.number,
    objectFit: MicromagPropTypes.objectFit,
    containerStyle: MicromagPropTypes.containerStyle,
    imageStyle: MicromagPropTypes.containerStyle,
    className: PropTypes.string,
    imageClassName: PropTypes.string,
    onLoaded: PropTypes.func,
    loadingMode: PropTypes.string,
    shouldLoad: PropTypes.bool
};

const defaultProps = {
    media: null,
    alt: null,
    width: null,
    height: null,
    resolution: 1,
    objectFit: null,
    containerStyle: {}, //
    imageStyle: {},
    className: null,
    imageClassName: null,
    onLoaded: null,
    loadingMode: 'lazy',
    shouldLoad: true
};

const Image = ({
    media,
    alt,
    width,
    height,
    resolution,
    objectFit,
    containerStyle,
    imageStyle,
    className,
    imageClassName,
    onLoaded,
    loadingMode,
    shouldLoad,
}) => {
    const { url = null, metadata = null } = media || {};
    const {
        width: mediaWidth = 0,
        height: mediaHeight = 0,
        description = 'image',
    } = metadata || {};
    const mediaRatio = mediaWidth / mediaHeight;

    const [{ width: realWidth = 0, height: realHeight = 0 }, setRealSize] = useState({
        width: mediaWidth,
        height: mediaHeight,
    });

    const wasLoadedRef = useRef(shouldLoad);
    if (shouldLoad && !wasLoadedRef.current) {
        wasLoadedRef.current = shouldLoad;
    }
    const { current: finalShouldLoad } = wasLoadedRef;

    const onImageLoaded = useCallback(
        (e) => {
            const {
                target: { naturalWidth = 0, naturalHeight = 0 },
            } = e;
            if (naturalWidth !== realWidth || naturalHeight !== realHeight) {
                setRealSize({ width: naturalWidth || 0, height: naturalHeight || 0 });
            }
            if (onLoaded !== null) {
                onLoaded(e);
            }
        },
        [onLoaded],
    );

    const withFit = objectFit !== null;
    const mediaHasSize = realWidth > 0 && realHeight > 0;

    let finalContainerStyle;
    let finalImageStyle;

    if (withFit) {
        let imageTop = 0;
        let imageLeft = 0;
        let imageWidth = width;
        let imageHeight = height;
        let imageObjectFit = null;
        let imageObjectPosition = null;

        const {
            fit = null,
            horizontalPosition = 'center',
            verticalPosition = 'center',
        } = objectFit || {};

        if (mediaHasSize) {
            const { width: resizedImageWidth, height: resizedImageHeight } = getSizeWithinBounds(
                realWidth,
                realHeight,
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

        const ratioWidth = mediaRatio && validHeight ? height * mediaRatio : null;
        const ratioHeight = mediaRatio && validWidth ? width / mediaRatio : null;

        let finalWidth = width !== null ? width : ratioWidth;
        let finalHeight = height !== null ? height : ratioHeight;

        if (finalWidth === null && finalHeight === null) {
            finalWidth = realWidth > 0 ? mediaWidth : null;
            finalHeight = realHeight > 0 ? mediaHeight : null;
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

    const { width: finalWidth = null, height: finalHeight = null } = finalImageStyle;
    const finalUrl = getOptimalImageUrl(media, finalWidth, finalHeight, {
        resolution,
    });

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
            {finalUrl !== null && finalShouldLoad ? (
                <img
                    src={finalUrl}
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
            ) : null}
        </div>
    );
};

Image.propTypes = propTypes;
Image.defaultProps = defaultProps;

export default Image;
