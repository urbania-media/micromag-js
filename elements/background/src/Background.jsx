/* eslint-disable react/jsx-props-no-spreading */
import { getSizeWithinBounds } from '@folklore/size';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useRef } from 'react';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { getOptimalImageUrl, getStyleFromColor } from '@micromag/core/utils';
import Video from '@micromag/element-video';

import styles from './styles.module.scss';

const propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    resolution: PropTypes.number,
    fit: PropTypes.oneOf(['contain', 'cover']),
    horizontalAlign: PropTypes.string,
    verticalAlign: PropTypes.string,
    repeat: PropTypes.bool,
    color: MicromagPropTypes.color,
    media: PropTypes.oneOfType([MicromagPropTypes.imageMedia, MicromagPropTypes.videoMedia]),
    mediaRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({
            // eslint-disable-next-line react/forbid-prop-types
            current: PropTypes.any,
        }),
    ]),
    className: PropTypes.string,
    playing: PropTypes.bool,
    children: PropTypes.node,
    loadingMode: PropTypes.string,
    shouldLoad: PropTypes.bool,
};

const defaultProps = {
    width: null,
    height: null,
    resolution: 1,
    fit: null,
    horizontalAlign: 'center',
    verticalAlign: 'center',
    repeat: false,
    color: null,
    media: null,
    mediaRef: null,
    className: null,
    playing: false,
    children: null,
    loadingMode: 'lazy',
    shouldLoad: true,
};

const Background = ({
    width,
    height,
    resolution,
    fit,
    horizontalAlign,
    verticalAlign,
    repeat,
    color,
    media,
    mediaRef,
    className,
    playing,
    children,
    loadingMode,
    shouldLoad,
}) => {
    const {
        type: mediaType = null,
        metadata: mediaMetadata = null,
        thumbnail_url: mediaThumbnailUrl,
    } = media || {};
    const { width: mediaWidth = 0, height: mediaHeight = 0 } = mediaMetadata || {};
    const isVideo = mediaType === 'video';
    const isImage = mediaType === 'image';

    // Lazy load
    const newShouldLoad = shouldLoad || loadingMode !== 'lazy';
    const wasLoadedRef = useRef(newShouldLoad);
    if (newShouldLoad && !wasLoadedRef.current) {
        wasLoadedRef.current = newShouldLoad;
    }
    const { current: finalShouldLoad } = wasLoadedRef;

    // color
    const containerStyle = {
        width,
        height,
        ...getStyleFromColor(color),
    };

    // image
    if (media !== null && (isImage || (isVideo && !shouldLoad))) {
        const finalUrl = getOptimalImageUrl(
            isVideo ? { url: mediaThumbnailUrl } : media,
            width,
            height,
            { resolution },
        );
        containerStyle.backgroundImage =
            finalUrl !== null && finalShouldLoad ? `url("${finalUrl}")` : null;
        containerStyle.backgroundRepeat = repeat && !isVideo ? 'repeat' : 'no-repeat';
        containerStyle.backgroundPosition = [horizontalAlign, verticalAlign].join(' ');

        if (fit !== null) {
            containerStyle.backgroundSize = fit;
        } else if (!repeat || isVideo) {
            containerStyle.backgroundSize = 'cover';
        }
    }

    // video
    const videoContainerStyle = {};
    if (isVideo && shouldLoad) {
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
            {isVideo && shouldLoad ? (
                <div className={styles.videoContainer} style={videoContainerStyle}>
                    <Video
                        className={styles.video}
                        media={media}
                        mediaRef={mediaRef}
                        autoPlay={playing}
                        initialMuted
                        loop
                        shouldLoad={shouldLoad}
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
