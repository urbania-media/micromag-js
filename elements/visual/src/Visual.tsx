import { getSizeWithinBounds } from '@folklore/size';
import classNames from 'classnames';
import { ForwardedRef } from 'react';

import type { ImageMedia, MediaElement, ObjectFit, VideoMedia } from '@micromag/core';
import { useIsVisible } from '@micromag/core/hooks';
import Image from '@micromag/element-image';
import Video from '@micromag/element-video';

import styles from './styles.module.css';

interface VisualProps {
    media?: ImageMedia | VideoMedia | null;
    mediaRef?: ForwardedRef<MediaElement> | null;
    width?: number | string | null;
    height?: number | string | null;
    ratio?: number | null;
    resolution?: number;
    objectFit?: ObjectFit | null;
    playing?: boolean;
    muted?: boolean;
    shouldLoad?: boolean;
    loadingMode?: string | null;
    videoLoop?: boolean;
    withoutVideo?: boolean;
    videoInitialMuted?: boolean;
    onLoaded?: ((...args: unknown[]) => void) | null;
    className?: string | null;
    imageClassName?: string | null;
    videoClassName?: string | null;
    qualityStartLevel?: number | null;
    onQualityLevelChange?: ((...args: unknown[]) => void) | null;
}

function Visual({
    media = null,
    mediaRef = null,
    width = null,
    height = null,
    ratio = null,
    resolution = 1,
    objectFit = null,
    playing = true,
    muted = true,
    loadingMode = null,
    shouldLoad = true,
    videoLoop = true,
    videoInitialMuted: _videoInitialMuted = true,
    onLoaded: onParentLoaded = null,
    className = null,
    imageClassName = null,
    videoClassName = null,
    withoutVideo = false,
    qualityStartLevel = null,
    onQualityLevelChange = null,
    ...props
}: VisualProps) {
    const { type = null, thumbnail_url: thumbnailUrl = null } = media || {};
    const isVideo = type === 'video';
    const isLazyLoading = loadingMode === 'lazy';
    const { ref: refVisible, visible: isVisible } = useIsVisible({
        rootMargin: '200px',
        persist: true,
        disabled: !isLazyLoading,
    });
    const finalShouldLoad = (!isLazyLoading || isVisible) && shouldLoad;

    let videoContainerStyle = null;

    if (type === 'video' && objectFit !== null && shouldLoad) {
        const { fit = 'cover' } = objectFit || {};
        const { metadata: videoMetadata = null } = media || {};
        const { width: videoWidth = 0, height: videoHeight = 0 } = videoMetadata || {};
        const { width: resizedVideoWidth, height: resizedVideoHeight } = getSizeWithinBounds(
            videoWidth,
            videoHeight,
            width,
            height,
            { cover: fit === 'cover' },
        );

        const resizedVideoLeft = -(resizedVideoWidth - width) / 2;
        const resizedVideoTop = -(resizedVideoHeight - height) / 2;

        videoContainerStyle = {
            width: resizedVideoWidth,
            height: resizedVideoHeight,
            left: resizedVideoLeft,
            top: resizedVideoTop,
        };
    }

    const natural = objectFit === null;

    const onLoaded = (e) => {
        if (onParentLoaded !== null) {
            onParentLoaded(e);
        }
    };

    return type !== null ? (
        <>
            {type === 'image' || !shouldLoad || withoutVideo ? (
                <Image
                    {...props}
                    media={isVideo ? { url: thumbnailUrl } : media}
                    ref={refVisible}
                    loadingMode={loadingMode !== 'lazy' ? 'lazy' : null}
                    objectFit={objectFit}
                    width={width}
                    height={height}
                    resolution={resolution}
                    shouldLoad={finalShouldLoad}
                    onLoaded={onLoaded}
                    className={classNames([styles.container, className])}
                    imageClassName={imageClassName}
                />
            ) : null}
            {type === 'video' && shouldLoad && !withoutVideo ? (
                <div
                    className={classNames([
                        styles.container,
                        className,
                        { [styles.natural]: natural },
                    ])}
                    style={{ width, height, aspectRatio: ratio !== null ? `${ratio}` : null }}
                    ref={refVisible}
                >
                    <div
                        className={classNames([styles.videoContainer, videoClassName])}
                        style={videoContainerStyle}
                    >
                        <Video
                            {...props}
                            media={media as VideoMedia}
                            innerClassName={styles.videoTag}
                            mediaRef={mediaRef}
                            width={objectFit === null ? width : null}
                            height={objectFit === null ? height : null}
                            paused={!playing}
                            muted={muted}
                            loop={videoLoop}
                            shouldLoad={finalShouldLoad}
                            onReady={onLoaded}
                            autoPlay
                            qualityStartLevel={qualityStartLevel}
                            onQualityLevelChange={onQualityLevelChange}
                        />
                        <div className={styles.videoTouchOverlay} />
                    </div>
                </div>
            ) : null}
        </>
    ) : null;
}

export default Visual;
