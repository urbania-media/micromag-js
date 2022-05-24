/* eslint-disable react/jsx-props-no-spreading */
import { getSizeWithinBounds } from '@folklore/size';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import Image from '@micromag/element-image';
import Video from '@micromag/element-video';
import styles from './styles.module.scss';

const propTypes = {
    media: MicromagPropTypes.media,
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
    width,
    height,
    resolution,
    objectFit,
    playing,
    shouldLoad,
    videoLoop,
    videoInitialMuted,
    onLoaded,
    className,
    videoClassName,
    ...props
}) => {
    const { type = null } = media || {};
    const elProps = useMemo(() => ({ ...props, media }), [props, media]);

    let videoContainerStyle = null;

    if (type === 'video' && objectFit !== null && playing) {
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

    return type !== null ? (
        <>
            {type === 'image' ? (
                <Image
                    {...elProps}
                    objectFit={objectFit}
                    width={width}
                    height={height}
                    resolution={resolution}
                    shouldLoad={shouldLoad}
                    onLoaded={onLoaded}
                    className={classNames([styles.container, { [className]: className !== null }])}
                />
            ) : null}
            {type === 'video' ? (
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
                            width={objectFit === null ? width : null}
                            height={objectFit === null ? height : null}
                            autoPlay
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
