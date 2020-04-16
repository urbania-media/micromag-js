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
    className: PropTypes.string,
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
    className: null,
};

const Image = ({ image, caption, credits, width, height, maxWidth, maxHeight, fit, className }) => {
    const { url, width: imageWidth, height: imageHeight } = image || {};
    const imgRef = useRef(null);
    const [imageSize, setImageSize] = useState({
        width: imageWidth,
        height: imageHeight,
    });
    const onLoad = useCallback(() => {
        setImageSize({
            width: imgRef.current.naturalWidth,
            height: imgRef.current.naturalHeight,
        });
    }, []);

    const { size = 'contain' } = fit || {};
    const imgSize =
        width !== null && height !== null
            ? getSizeWithinBounds(imageSize.width, imageSize.height, width, height, {
                  cover: size === 'cover',
              })
            : null;

    const img = (
        <img
            src={url}
            alt={caption || credits}
            className={classNames([
                styles.img,
                {
                    [className]: className !== null,
                },
            ])}
            style={
                imgSize !== null
                    ? {
                          width: imgSize.width,
                          height: imgSize.height,
                          top: (height - imgSize.height) / 2,
                          left: (width - imgSize.width) / 2,
                      }
                    : {
                          maxWidth,
                          maxHeight,
                      }
            }
            ref={imgRef}
            onLoad={onLoad}
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
            style={{
                width,
                height,
            }}
        >
            {img}
        </div>
    ) : (
        img
    );
};

Image.propTypes = propTypes;
Image.defaultProps = defaultProps;

export default Image;
