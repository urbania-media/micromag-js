/* eslint-disable react/jsx-props-no-spreading */
import { getSizeWithinBounds } from '@folklore/size';
import classNames from 'classnames';
import React, { useRef } from 'react';

import type { Color, ImageMedia, VideoMedia } from '@micromag/core';
import { useSetting } from '@micromag/core/contexts';
import { getOptimalImageUrl, getStyleFromColor } from '@micromag/core/utils';
import Video from '@micromag/element-video';

import styles from './styles.module.css';

interface BackgroundProps {
    width?: number;
    height?: number;
    resolution?: number;
    fit?: 'contain' | 'cover';
    horizontalAlign?: string;
    verticalAlign?: string;
    repeat?: boolean;
    color?: Color;
    media?: ImageMedia | VideoMedia;
    mediaRef?: (...args: unknown[]) => void | { current?: unknown };
    className?: string;
    playing?: boolean;
    muted?: boolean;
    children?: React.ReactNode;
    loadingMode?: string;
    shouldLoad?: boolean;
    onPlayError?: (...args: unknown[]) => void;
    withoutVideo?: boolean;
    forceMuted?: boolean;
    qualityStartLevel?: number;
    onQualityLevelChange?: (...args: unknown[]) => void;
}

const Background = ({
    width = null,
    height = null,
    resolution = 1,
    fit = null,
    horizontalAlign = 'center',
    verticalAlign = 'center',
    repeat = false,
    color = null,
    media = null,
    mediaRef = null,
    className = null,
    playing = false,
    muted = false,
    children = null,
    loadingMode = 'lazy',
    shouldLoad = true,
    onPlayError = null,
    withoutVideo = false,
    forceMuted = false,
    qualityStartLevel = null,
    onQualityLevelChange = null,
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

    const supportsWebp = useSetting('supportsWebp', false);
    const imageResolution = useSetting('imageResolution', resolution);

    // image
    if (media !== null && (isImage || (isVideo && (!shouldLoad || withoutVideo)))) {
        const finalUrl = getOptimalImageUrl(
            isVideo ? { url: mediaThumbnailUrl } : media,
            width,
            height,
            { resolution: imageResolution, supportsWebp },
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
            {isVideo && shouldLoad && !withoutVideo ? (
                <div className={styles.videoContainer} style={videoContainerStyle}>
                    <Video
                        className={styles.video}
                        media={media}
                        mediaRef={!forceMuted ? mediaRef : null}
                        paused={!playing}
                        muted={muted || forceMuted}
                        shouldLoad={shouldLoad}
                        onPlayError={onPlayError}
                        disablePictureInPicture
                        autoPlay
                        loop
                        withPoster
                        focusable={false}
                        qualityStartLevel={qualityStartLevel}
                        onQualityLevelChange={onQualityLevelChange}
                    />
                </div>
            ) : null}
            <div className={styles.content}>{children}</div>
        </div>
    );
};

export default Background;
