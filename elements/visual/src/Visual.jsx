/* eslint-disable react/jsx-props-no-spreading */
import { getSizeWithinBounds } from '@folklore/size';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useMemo, useCallback } from 'react';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import Image from '@micromag/element-image';
import Video from '@micromag/element-video';

import styles from './styles.module.scss';

const propTypes = {
    media: MicromagPropTypes.media,
    mediaRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({
            // eslint-disable-next-line react/forbid-prop-types
            current: PropTypes.any,
        }),
    ]),
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    resolution: PropTypes.number,
    objectFit: MicromagPropTypes.objectFit,
    playing: PropTypes.bool,
    shouldLoad: PropTypes.bool,
    videoLoop: PropTypes.bool,
    videoInitialMuted: PropTypes.bool,
    onLoaded: PropTypes.func,
    className: PropTypes.string,
    videoClassName: PropTypes.string,
};

const defaultProps = {
    media: null,
    mediaRef: null,
    width: null,
    height: null,
    resolution: 1,
    objectFit: null,
    playing: true,
    shouldLoad: true,
    videoLoop: true,
    videoInitialMuted: true,
    onLoaded: null,
    className: null,
    videoClassName: null,
};

const Visual = ({
    media,
    mediaRef,
    width,
    height,
    resolution,
    objectFit,
    playing,
    shouldLoad,
    videoLoop,
    videoInitialMuted,
    onLoaded: onParentLoaded,
    className,
    videoClassName,
    ...props
}) => {
    const { type = null, thumbnail_url: thumbnailUrl = null, url = null } = media || {};
    const isVideo = type === 'video';
    const elProps = useMemo(() => ({ ...props, media }), [props, media]);

    const imageElProps = useMemo(() => {
        const tmpProps =
            !shouldLoad && isVideo ? { ...elProps, media: { url: thumbnailUrl } } : elProps;
        return shouldLoad ? { ...elProps, media: { url } } : tmpProps;
    }, [isVideo, elProps, thumbnailUrl, url, shouldLoad]);

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

    const onLoaded = useCallback((e) => {
        if (onParentLoaded !== null) {
            onParentLoaded(e);
        }
    }, []);

    return type !== null ? (
        <>
            {type === 'image' || !shouldLoad ? (
                <Image
                    {...imageElProps}
                    objectFit={objectFit}
                    width={width}
                    height={height}
                    resolution={resolution}
                    shouldLoad={shouldLoad}
                    onLoaded={onLoaded}
                    className={classNames([styles.container, { [className]: className !== null }])}
                />
            ) : null}
            {type === 'video' && shouldLoad ? (
                <div
                    className={classNames([styles.container, { [className]: className !== null }])}
                    style={{ width, height }}
                >
                    <div
                        className={classNames([
                            styles.videoContainer,
                            { [videoClassName]: videoClassName !== null },
                        ])}
                        style={videoContainerStyle}
                    >
                        <Video
                            {...elProps}
                            mediaRef={mediaRef}
                            width={objectFit === null ? width : null}
                            height={objectFit === null ? height : null}
                            autoPlay={playing}
                            loop={videoLoop}
                            shouldLoad={shouldLoad}
                            initialMuted={videoInitialMuted}
                            onReady={onLoaded}
                        />
                    </div>
                </div>
            ) : null}
        </>
    ) : null;
};

Visual.propTypes = propTypes;
Visual.defaultProps = defaultProps;

export default Visual;
