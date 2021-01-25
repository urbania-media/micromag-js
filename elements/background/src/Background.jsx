/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { getStyleFromColor } from '@micromag/core/utils';
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
    const hasSize = width > 0 && height > 0;
    const sizeStyle = hasSize ? {
        width, height
    } : null;

    // color
    const finalStyle = {
        ...sizeStyle,
        ...getStyleFromColor(color),
    };

    // image
    if (image !== null) {
        const { url: imageUrl = null } = image || {};
        finalStyle.backgroundImage = `url("${imageUrl}")`;
        finalStyle.backgroundRepeat = repeat ? 'repeat' : 'no-repeat';
        finalStyle.backgroundPosition = [horizontalAlign, verticalAlign].join(' ');

        if (fit !== null) {
            finalStyle.backgroundSize = fit;
        }
    }

    // video
    const hasVideo = video !== null;
    const videoContainerStyle = {};
    if (hasVideo) {
        if (hasSize) {
            const { metadata: videoMetadata = null } = video || {};
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
            {hasVideo ? (
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
