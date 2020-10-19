/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import TextElement from '@micromag/element-text';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { getSizeWithinBounds } from '@folklore/size';

import styles from './styles.module.scss';

const propTypes = {
    media: PropTypes.shape({
        url: PropTypes.string.isRequired,
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
    }),
    alt: PropTypes.string,
    caption: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    shrinkWidth: PropTypes.bool,
    shrinkHeight: PropTypes.bool,
    objectFit: MicromagPropTypes.objectFit,
    containerStyle: MicromagPropTypes.containerStyle,
    imageStyle: MicromagPropTypes.containerStyle,
    captionStyle: MicromagPropTypes.textStyle,    
    className: PropTypes.string,
    imageClassName: PropTypes.string,
    onLoaded: PropTypes.func,
};

const defaultProps = {
    media: null,
    alt: 'image',
    caption: null,
    width: null,
    height: null,
    shrinkWidth: false,
    shrinkHeight: false,
    objectFit: null,
    containerStyle: {},
    imageStyle: {},
    captionStyle: {},    
    className: null,
    imageClassName: null,
    onLoaded: null,
};

const Image = ({
    media,
    alt,
    caption,
    width,
    height,
    shrinkWidth,
    shrinkHeight,
    objectFit,
    containerStyle,
    imageStyle,
    captionStyle,    
    className,
    imageClassName,
    onLoaded,
}) => {
    const { url = null, width: mediaWidth, height: mediaHeight } = media || {};    

    const withFit = objectFit !== null;
    
    let finalContainerStyle;
    let finalImageStyle;

    if (withFit) {        
        const { fit = null, horizontalPosition = 'center', verticalPosition = 'center' } = objectFit || {};        
        const { width: imageWidth, height: imageHeight } = getSizeWithinBounds(mediaWidth, mediaHeight, width, height, { cover: fit === 'cover' });

        let imageTop;
        let imageLeft;

        if (horizontalPosition === 'center') {
            imageLeft = -(imageWidth - width) / 2;
        } else if (horizontalPosition === 'right') {
            imageLeft = -(imageWidth - width);
        } else {
            imageLeft = 0;
        }

        if (verticalPosition === 'center') {
            imageTop = -(imageHeight - height) / 2;
        } else if (verticalPosition === 'bottom') {
            imageTop = -(imageHeight - height);
        } else {
            imageTop = 0;
        }

        const finalImageWidth = shrinkWidth ? Math.min(imageWidth, width) : width;
        const finalImageHeight = shrinkHeight ? Math.min(imageHeight, height) : height;        

        if (shrinkWidth && width > imageWidth) {
            imageLeft = 0;
        }

        if (shrinkHeight && height > imageHeight) {
            imageTop = 0;
        }

        finalContainerStyle = {
            width: finalImageWidth,
            height: finalImageHeight,
        }
        
        finalImageStyle = {
            position: 'absolute',
            width: imageWidth,
            height: imageHeight,
            top: imageTop,
            left: imageLeft,
        }
    } else {
        finalImageStyle = {
            width,
            height,
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
            { img }
            { url !== null && caption !== null ? (
                <div className={styles.caption}>
                    <TextElement body={caption} style={captionStyle} className={styles.text} />
                </div>
            ) : null }
        </div>
    );
};

Image.propTypes = propTypes;
Image.defaultProps = defaultProps;

export default Image;
