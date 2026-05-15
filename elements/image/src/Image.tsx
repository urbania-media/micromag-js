import { getSizeWithinBounds } from '@folklore/size';
import classNames from 'classnames';
import React, { ForwardedRef, useCallback, useRef, useState } from 'react';

import type { ContainerStyle, ImageMedia, ObjectFit } from '@micromag/core';
import { useSetting } from '@micromag/core/contexts';
import { getOptimalImageUrl } from '@micromag/core/utils';

import styles from './styles.module.css';

const emptyObject = {} as const;

interface ImageProps {
    media?: ImageMedia | null;
    alt?: string | null;
    width?: number | string | null;
    height?: number | string | null;
    resolution?: number;
    objectFit?: ObjectFit | null;
    containerStyle?: ContainerStyle;
    imageStyle?: ContainerStyle;
    className?: string | null;
    imageClassName?: string | null;
    onLoaded?: ((...args: unknown[]) => void) | null;
    loadingMode?: string;
    shouldLoad?: boolean;
    ref?: ForwardedRef<HTMLDivElement> | null;
}

function Image({
    media = null,
    alt = null,
    width = null,
    height = null,
    resolution = 1,
    objectFit = null,
    containerStyle = emptyObject,
    imageStyle = emptyObject,
    className = null,
    imageClassName = null,
    onLoaded = null,
    loadingMode = 'lazy',
    shouldLoad = true,
    ref = null,
}: ImageProps) {
    const { metadata = null } = media || {};
    const {
        width: mediaWidth = 0,
        height: mediaHeight = 0,
        description = 'image',
    } = metadata || {};
    const mediaRatio = mediaWidth / mediaHeight;

    const [realSize, setRealSize] = useState({
        width: mediaWidth,
        height: mediaHeight,
    });
    const { width: realWidth = 0, height: realHeight = 0 } = realSize;
    const supportsWebp = useSetting('supportsWebp', false);
    const imageResolution = useSetting('imageResolution', resolution);

    const [wasLoaded, setWasLoaded] = useState(shouldLoad);
    if (shouldLoad && !wasLoaded) {
        setWasLoaded(shouldLoad);
    }
    const finalShouldLoad = wasLoaded || shouldLoad;

    const onImageLoaded = (e) => {
        const {
            target: { naturalWidth = 0, naturalHeight = 0 },
        } = e;
        if (naturalWidth !== realWidth || naturalHeight !== realHeight) {
            setRealSize({ width: naturalWidth || 0, height: naturalHeight || 0 });
        }
        if (onLoaded !== null) {
            onLoaded(e);
        }
    };

    const withFit = objectFit !== null;
    const mediaHasSize = realWidth > 0 && realHeight > 0;

    let finalContainerStyle;
    let finalImageStyle;
    let imageWidthPixel;
    let imageHeightPixel;

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
        imageWidthPixel = imageWidth;
        imageHeightPixel = imageHeight;
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

        imageWidthPixel = ratioWidth ?? realWidth ?? mediaWidth;
        imageHeightPixel = ratioHeight ?? realHeight ?? mediaHeight;

        finalContainerStyle = {
            width: finalWidth,
            height: finalHeight,
        };

        finalImageStyle = { width: '100%', height: validHeight ? '100%' : 'auto' };
    }

    finalContainerStyle = {
        ...finalContainerStyle,
        ...containerStyle,
    };

    finalImageStyle = {
        ...finalImageStyle,
        ...imageStyle,
    };

    const finalUrl = getOptimalImageUrl(
        media,
        imageWidthPixel,
        imageHeightPixel || imageWidthPixel,
        {
            resolution: imageResolution,
            supportsWebp,
        },
    );

    return (
        <div
            className={classNames([styles.container, className])}
            style={finalContainerStyle}
            ref={ref}
        >
            {finalUrl !== null && finalShouldLoad ? (
                <img
                    src={finalUrl}
                    alt={alt || description}
                    className={classNames([styles.img, imageClassName])}
                    style={finalImageStyle}
                    width={realWidth}
                    height={realHeight}
                    onLoad={onImageLoaded}
                    loading={loadingMode}
                />
            ) : null}
        </div>
    );
}

export default Image;
