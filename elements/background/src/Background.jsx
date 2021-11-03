/* eslint-disable react/jsx-props-no-spreading */
import React, { useMemo } from 'react';
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
    media: PropTypes.oneOfType([MicromagPropTypes.imageMedia, MicromagPropTypes.videoMedia]),
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
    media: null,
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
    media,
    className,
    playing,
    children,
}) => {
    const {
        type: mediaType = null,
        metadata: mediaMetadata = null,
        thumbnail_url: mediaThumbnailUrl,
    } = media || {};
    const { width: mediaWidth = 0, height: mediaHeight = 0 } = mediaMetadata || {};
    const isVideo = mediaType === 'video';
    const isImage = mediaType === 'image';

    // color
    const containerStyle = {
        width,
        height,
        ...getStyleFromColor(color),
    };

    // image
    if (media !== null && (isImage || (isVideo && !playing))) {
        const finalUrl = getOptimalImageUrl(
            isVideo ? { url: mediaThumbnailUrl } : media,
            width,
            height,
        );
        containerStyle.backgroundImage = finalUrl !== null ? `url("${finalUrl}")` : null;
        containerStyle.backgroundRepeat = repeat ? 'repeat' : 'no-repeat';
        containerStyle.backgroundPosition = [horizontalAlign, verticalAlign].join(' ');

        if (fit !== null) {
            containerStyle.backgroundSize = fit;
        } else if (!repeat) {
            containerStyle.backgroundSize = 'cover';
        }
    }

    // video
    const videoContainerStyle = {};
    if (isVideo && playing) {
        if (width > 0 && height > 0) {
            const { width: videoWidth = 0, height: videoHeight = 0 } = getSizeWithinBounds(
                mediaWidth,
                mediaHeight,
                width,
                height,
                {
                    cover: fit === 'cover' || fit === null,
                },
            );
            videoContainerStyle.width = videoWidth;
            videoContainerStyle.height = videoHeight;
            videoContainerStyle.left = -(videoWidth - width) / 2;
            videoContainerStyle.top = -(videoHeight - height) / 2;
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
            style={containerStyle}
        >
            {isVideo && playing ? (
                <div className={styles.videoContainer} style={videoContainerStyle}>
                    <Video
                        className={styles.video}
                        media={media}
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
