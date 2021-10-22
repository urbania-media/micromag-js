/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { getStyleFromColor, getOptimalImageUrl } from '@micromag/core/utils';
import Video from '@micromag/element-video';
import { getSizeWithinBounds } from '@folklore/size';

import styles from './styles.module.scss';

const propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    fit: PropTypes.oneOf(['contain', 'cover']),
    horizontalAlign: PropTypes.string,
    verticalAlign: PropTypes.string,
    repeat: PropTypes.bool,
    color: MicromagPropTypes.color,
    image: MicromagPropTypes.imageMedia,
    video: MicromagPropTypes.videoMedia,
    className: PropTypes.string,
    playing: PropTypes.bool,
    children: PropTypes.node,
};

const defaultProps = {
    width: null,
    height: null,
    fit: null,
    horizontalAlign: 'center',
    verticalAlign: 'center',
    repeat: false,
    color: null,
    image: null,
    video: null,
    className: null,
    playing: false,
    children: null,
};

const Background = ({
    width,
    height,
    fit,
    horizontalAlign,
    verticalAlign,
    repeat,
    color,
    image,
    video,
    className,
    playing,
    children,
}) => {
    const hasVideo = video !== null;
    const { metadata: videoMetadata = null, thumbnail_url:videoThumbnail = null } = video || {};
    const hasSize = width > 0 && height > 0;
    const sizeStyle = hasSize ? {
        width, height
    } : null;

    // color
    const finalStyle = {
        ...sizeStyle,
        ...getStyleFromColor(color),
    };

    const { metadata: imageMetadata, thumbnail_url: imageThumbnailUrl, url:imageUrl } = image || {};
    const { mime:imageMIME } = imageMetadata || {};
    const isImageGIF = imageMIME === 'image/gif';
    const tmpImage = hasVideo && !playing && videoThumbnail !== null ? { url: videoThumbnail } : image;
    const finalImage = isImageGIF ? { url: playing ? imageUrl : imageThumbnailUrl } : tmpImage;

    // image
    if (finalImage !== null && (!hasVideo || !playing)) {
        const finalUrl = getOptimalImageUrl(finalImage, width, height);
        finalStyle.backgroundImage = `url("${finalUrl}")`;
        finalStyle.backgroundRepeat = repeat ? 'repeat' : 'no-repeat';
        finalStyle.backgroundPosition = [horizontalAlign, verticalAlign].join(' ');

        if (fit !== null) {
            finalStyle.backgroundSize = fit;
        } else if (!repeat) {
            finalStyle.backgroundSize = 'cover';
        }
    }

    // video
    
    const videoContainerStyle = {};
    if (hasVideo && playing) {
        if (hasSize) {            
            const { width: videoWidth = 0, height: videoHeight = 0 } = videoMetadata || {};
            const { width: resizedVideoWidth = 0, height: resizedVideoHeight = 0} = getSizeWithinBounds(
                videoWidth,
                videoHeight,
                width,
                height,
                { cover: fit === 'cover' || fit === null },
            );
            const resizedVideoLeft = -(resizedVideoWidth - width) / 2;
            const resizedVideoTop = -(resizedVideoHeight - height) / 2;
            videoContainerStyle.width = resizedVideoWidth;
            videoContainerStyle.height = resizedVideoHeight;
            videoContainerStyle.left = resizedVideoLeft;
            videoContainerStyle.top = resizedVideoTop;
        } else {
            videoContainerStyle.objectFit = 'cover';
        }
    }

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
            style={finalStyle}
        >
            {hasVideo && playing ? (
                <div
                    className={styles.videoContainer}
                    style={videoContainerStyle}
                >
                    <Video
                        className={styles.video}
                        media={video}
                        autoPlay={playing}
                        initialMuted
                        loop
                    />
                </div>
            ) : null}
            <div className={styles.content}>{children}</div>
        </div>
    );
};

Background.propTypes = propTypes;
Background.defaultProps = defaultProps;

export default Background;
