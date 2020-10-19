/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import TextElement from '@micromag/element-text';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { /* getStyleFromImage, */ getStyleFromContainer } from '@micromag/core/utils';
// import { getSizeWithinBounds } from '@folklore/size';

import styles from './styles.module.scss';

const propTypes = {
    media: PropTypes.shape({
        url: PropTypes.string.isRequired,
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
    }),
    alt: PropTypes.string,
    caption: PropTypes.string,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    fit: MicromagPropTypes.objectFit,
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
    fit: null,
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
    fit,
    containerStyle,
    imageStyle,
    captionStyle,    
    className,
    imageClassName,
    onLoaded,
}) => {
    const { url = null, width: mediaWidth, height: mediaHeight } = media || {};    

    const withFit = fit !== null;    

    
    let finalContainerStyle;
    let imageContainerStyle;
    let finalImageStyle;

    if (withFit) {        
        const { size = null, position = null, maxRatio = null } = fit || {};
        const imageRatio = mediaWidth > 0 && mediaHeight > 0 ? mediaHeight / mediaWidth : 0;
        console.log(imageRatio, maxRatio);
        // console.log(getSizeWithinBounds(mediaWidth, mediaHeight, width, height))

        if (maxRatio !== null) {
            finalContainerStyle = {
                width,
                height,
            }
            imageContainerStyle = {
                width: '100%',
                height: 0,
                paddingBottom: `${maxRatio * 100}%`,
            }
        } else {
            finalContainerStyle = {
                width,
                height,
            }
        }
        
        finalImageStyle = {
            position: 'absolute',
            width: '100%',
            height: '100%',
            objectFit: size,
            objectPosition: position,
        }
    } else {
        // no fit, we simply apply size to the <img>
        finalImageStyle = {
            width,
            height,
        };
    }

    finalContainerStyle = {
        ...finalContainerStyle,
        containerStyle,// ...getStyleFromContainer(containerStyle),
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
            <div className={styles.imageContainer} style={imageContainerStyle}>
                { img }
            </div>
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
