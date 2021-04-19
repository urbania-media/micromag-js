/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { getSizeWithinBounds } from '@folklore/size';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import Image from '@micromag/element-image';
import Video from '@micromag/element-video';

import styles from './styles.module.scss';

const propTypes = {
    media: MicromagPropTypes.media,
    width: PropTypes.number,
    height: PropTypes.number,
    objectFit: MicromagPropTypes.objectFit,
    videoPreload: PropTypes.bool,
    videoAutoplay: PropTypes.bool,
    videoLoop: PropTypes.bool,
    videoInitialMuted: PropTypes.bool,
    onLoaded: PropTypes.func,
    className: PropTypes.string,
};

const defaultProps = {
    media: null,
    width: null,
    height: null,
    objectFit: null,
    videoPreload: 'auto',
    videoAutoplay: true,
    videoLoop: true,
    videoInitialMuted: true,
    onLoaded: null,
    className: null,
};

const Visual = ({
    media,
    width,
    height,
    objectFit,
    videoPreload,
    videoAutoplay,
    videoLoop,
    videoInitialMuted,
    onLoaded,
    className,
    ...props
}) => {
    const { type = null } = media || {};

    const elProps = { ...props, media };

    let videoContainerStyle = null;

    if (type === 'video' && objectFit !== null) {
        const { fit = 'cover' } = objectFit || {};
        const { metadata: videoMetadata = null } = media || {};
        const { width: videoWidth = 0, height: videoHeight = 0 } = videoMetadata || {};
        const {
            width: resizedVideoWidth,
            height: resizedVideoHeight,
        } = getSizeWithinBounds(videoWidth, videoHeight, width, height, { cover: fit === 'cover' });

        const resizedVideoLeft = -(resizedVideoWidth - width) / 2;
        const resizedVideoTop = -(resizedVideoHeight - height) / 2;

        videoContainerStyle = {
            position: 'absolute',
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
                    onLoaded={onLoaded}
                    className={classNames([styles.container, {[className] : className !== null }])}
                />
            ) : null}
            {type === 'video' ? (
                <div className={classNames([styles.container, {[className] : className !== null }])} style={{ width, height }}>
                    <div style={videoContainerStyle}>
                        <Video
                            {...elProps}
                            width={objectFit === null ? width : null}
                            height={objectFit === null ? height : null}
                            preload={videoPreload}
                            autoPlay={videoAutoplay}
                            loop={videoLoop}
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
