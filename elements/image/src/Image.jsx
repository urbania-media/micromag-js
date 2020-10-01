/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import TextElement from '@micromag/element-text';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { getStyleFromImage, getStyleFromContainer } from '@micromag/core/utils';

// import { getSizeWithinBounds } from '@folklore/size';

import styles from './styles.module.scss';

const propTypes = {
    media: PropTypes.shape({
        url: PropTypes.string.isRequired,
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
    }),
    name: PropTypes.string,
    caption: PropTypes.string,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    fit: MicromagPropTypes.objectFit,
    imageStyle: MicromagPropTypes.imageStyle,
    containerStyle: MicromagPropTypes.containerStyle,
    captionStyle: MicromagPropTypes.textStyle,    
    className: PropTypes.string,
    imageClassName: PropTypes.string,
    onLoaded: PropTypes.func,
};

const defaultProps = {
    media: null,
    name: null,
    caption: null,
    width: null,
    height: null,
    fit: null,
    imageStyle: {},
    containerStyle: {},
    captionStyle: {},    
    className: null,
    imageClassName: null,
    onLoaded: null,
};

const Image = ({
    media,
    name,
    caption,
    width: maxWidth,
    height: maxHeight,
    fit: defaultFit,    
    imageStyle,
    containerStyle,
    captionStyle,    
    className,
    imageClassName,
    onLoaded,
}) => {
    const { url = null, width: imageWidth, height: imageHeight } = media || {};
    const width = maxWidth !== null ? Math.min(imageWidth, maxWidth) : null;
    const height = maxHeight !== null ? Math.min(imageHeight, maxHeight) : null;
    const { size = 'contain' } = defaultFit || {};

    let fill = false;
    let alt = name || 'image';
    let finalStyle = {
        width,
        height,
        objectFit: size,
    };
    if (imageStyle !== null) {
        finalStyle = {
            ...finalStyle,
            ...getStyleFromImage(imageStyle),
        };
        if (imageStyle.alt) {
            alt = imageStyle.alt;
        }
        if (imageStyle.fit) {
            if (imageStyle.fit.fill) {
                fill = imageStyle.fit.fill;
            }
        }
    }

    let containerFinalStyle = {
        width: fill ? '100%' : maxWidth,
        height: fill ? '100%' : maxHeight,
    };

    if (containerStyle !== null) {
        containerFinalStyle = {
            ...containerFinalStyle,
            ...getStyleFromContainer(containerStyle),
        };
    }

    const img = url ? (
        <img
            src={url}
            alt={alt || name}
            className={classNames([
                styles.img,
                {
                    [imageClassName]: imageClassName !== null,
                },
            ])}
            style={finalStyle}
            onLoad={onLoaded}
        />
    ) : null;

    return (
        <div
            id="image"
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
            style={containerFinalStyle}
        >
            {img}
            {url && caption ? (
                <div className={styles.caption}>
                    <TextElement body={caption} style={captionStyle} className={styles.text} />
                </div>
            ) : null}
        </div>
    );
};

Image.propTypes = propTypes;
Image.defaultProps = defaultProps;

export default Image;
