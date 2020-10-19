/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { PlaceholderVideo, Transitions } from '@micromag/core/components';
import { useScreenSize, useScreenRenderContext } from '@micromag/core/contexts';
import Background from '@micromag/element-background';
import Container from '@micromag/element-container';
import Image from '@micromag/element-image';
import VideoComponent from '@micromag/element-video';

import styles from './styles.module.scss';

const propTypes = {
    video: MicromagPropTypes.videoElement,
    layout: PropTypes.oneOf(['full', 'center']),
    background: MicromagPropTypes.backgroundElement,
    current: PropTypes.bool,
    active: PropTypes.bool,
    maxRatio: PropTypes.number,
    transitions: MicromagPropTypes.transitions,
    className: PropTypes.string,
};

const defaultProps = {
    video: null,
    layout: null,
    background: null,
    current: true,
    active: true,
    maxRatio: 3 / 4,
    transitions: {
        in: {
            name: 'fade',
            duration: 1000,
        },
        out: 'scale',
    },
    className: null,
};

const VideoScreen = ({
    video: videoField,
    layout,
    background,
    current,
    active,
    maxRatio,
    transitions,
    className,
}) => {
    const autoPlay = false; // props?
    const { width, height } = useScreenSize();
    const { isPreview, isEdit, isPlaceholder, isView } = useScreenRenderContext();
    const { video = null, params = {} } = videoField || {};
    const isNonInteractive = isPlaceholder || isPreview;
    const autoplayCondition = isEdit ? autoPlay && active : autoPlay && !isNonInteractive;
    const isFullScreen = layout === 'full';

    const withVideo = video !== null;
    // @TODO enlever le "|| true" après avoir fixé le <Video> qui trigger le onReady
    const [ready, setReady] = useState(!withVideo || true);
    const transitionPlaying = current && ready;

    const onVideoReady = useCallback(() => {
        setReady(true);
    }, [setReady]);

    let videoElement = null;
    if (isPreview && withVideo && video.thumbnail_url && video.metadata) {
        videoElement = (
            <Image
                image={{ media: { url: video.thumbnail_url }, metadata: video.metadata }}
                className={styles.preview}
            />
        );
    } else if (isNonInteractive) {
        videoElement = (
            <PlaceholderVideo
                className={styles.placeholder}
                width={isFullScreen ? '100%' : undefined}
                height={isFullScreen ? '100%' : undefined}
            />
        );
    } else if (withVideo) {
        videoElement = (
            <Transitions playing={transitionPlaying} transitions={transitions}>
                <VideoComponent
                    {...params}
                    autoPlay={autoplayCondition}
                    video={video}
                    width={Math.min(width, 768)}
                    height={height}
                    fit={{ size: isFullScreen ? 'cover' : 'contain' }}
                    showEmpty={isEdit}
                    className={styles.video}
                    onReady={onVideoReady}
                />
            </Transitions>
        );
    }

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                    [styles.fullscreen]: isFullScreen,
                },
            ])}
        >
            <Background
                {...(!isPlaceholder ? background : null)}
                width={width}
                height={height}
                playing={(isView && current) || (isEdit && active)}
                maxRatio={maxRatio}
            />
            <Container
                width={width}
                height={height}
                maxRatio={maxRatio}
                verticalAlign="center"
                itemClassName={styles.item}
            >
                {[videoElement]}
            </Container>
        </div>
    );
};

VideoScreen.propTypes = propTypes;
VideoScreen.defaultProps = defaultProps;

export default React.memo(VideoScreen);
