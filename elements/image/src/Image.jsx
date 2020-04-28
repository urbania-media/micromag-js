/* eslint-disable react/no-array-index-key */
import React, { useState, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { getSizeWithinBounds } from '@folklore/size';

import styles from './styles.module.scss';

const propTypes = {
    image: PropTypes.shape({
        url: PropTypes.string,
        width: PropTypes.number,
        height: PropTypes.number,
    }),
    caption: PropTypes.string,
    credits: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    maxWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    maxHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    fit: MicromagPropTypes.objectFit,
    resize: PropTypes.bool,
    showEmpty: PropTypes.bool,
    hasParentContainer: PropTypes.bool,
    className: PropTypes.string,
    imageClassName: PropTypes.string,
    emptyClassName: PropTypes.string,
};

const defaultProps = {
    image: {
        url: null,
        width: null,
        height: null,
    },
    caption: null,
    credits: null,
    width: null,
    height: null,
    maxWidth: null,
    maxHeight: null,
    fit: null,
    resize: true,
    showEmpty: false,
    hasParentContainer: true,
    className: null,
    imageClassName: null,
    emptyClassName: null,
};

const Image = ({
    image,
    caption,
    credits,
    width,
    height,
    maxWidth,
    maxHeight,
    fit,
    resize,
    showEmpty,
    hasParentContainer,
    className,
    imageClassName,
    emptyClassName,
}) => {
    const { url, width: imageWidth, height: imageHeight } = image || {};
    const imageHasSize = imageWidth && imageHeight;

    const imgRef = useRef(null);
    const [imageSize, setImageSize] = useState({
        width: imageWidth,
        height: imageHeight,
        containerHasSize: !imageHasSize,
    });
    const onLoad = useCallback(() => {
        setImageSize({
            width: imgRef.current.naturalWidth,
            height: imgRef.current.naturalHeight,
            containerHasSize: !hasParentContainer,
        });
    }, [hasParentContainer]);

    const { size = 'contain' } = fit || {};
    const imgSize =
        width !== null && height !== null && !imageHasSize
            ? getSizeWithinBounds(imageSize.width, imageSize.height, width, height, {
                  cover: size === 'cover',
              })
            : { ...(!resize ? { width: imageWidth, height: imageHeight } : null) };

    // console.log(imgSize);

    const imgStyle =
        imgSize !== null
            ? {
                  width: imgSize.width,
                  height: imgSize.height,
                  top: imageSize.containerHasSize ? (height - imgSize.height) / 2 : null,
                  left: imageSize.containerHasSize ? (width - imgSize.width) / 2 : null,
                  position: imageSize.containerHasSize ? 'absolute' : 'relative',
              }
            : {
                  maxWidth,
                  maxHeight,
              };

    // console.log(imgStyle);

    const img =
        showEmpty && !url ? (
            <div
                className={classNames([
                    styles.showEmpty,
                    {
                        [emptyClassName]: emptyClassName !== null,
                    },
                ])}
                ref={imgRef}
            />
        ) : (
            <img
                src={url}
                alt={caption || 'Image'}
                className={classNames([
                    styles.img,
                    {
                        [imageClassName]: imageClassName !== null,
                        [imageClassName]: imageClassName !== null,
                    },
                ])}
                style={imgStyle}
                ref={imgRef}
                onLoad={imageHasSize ? null : onLoad}
            />
        );

    return imgSize !== null ? (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
            style={
                imageSize.containerHasSize
                    ? {
                          width,
                          height,
                      }
                    : null
            }
        >
            {img}
            {url && credits ? (
                <div className={styles.credits} style={imgStyle}>
                    <span className={styles.text}>{credits}</span>
                </div>
            ) : null}
        </div>
    ) : (
        img
    );
};

Image.propTypes = propTypes;
Image.defaultProps = defaultProps;

export default Image;
