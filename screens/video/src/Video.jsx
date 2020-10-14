/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Background from '@micromag/element-background';
import Container from '@micromag/element-container';
import Image from '@micromag/element-image';
import VideoComponent from '@micromag/element-video';

import { useScreenSize } from '@micromag/core/contexts';
import { getRenderFormat } from '@micromag/core/utils';

import { PropTypes as MicromagPropTypes, PlaceholderVideo } from '@micromag/core';

<<<<<<< HEAD
import { layouts } from './definition';
=======
import styles from './styles.module.scss';
import Transitions from '@micromag/core/src/components/transitions/Transitions';
>>>>>>> develop

import styles from './styles.module.scss';

const propTypes = {
    video: MicromagPropTypes.video,
    layout: PropTypes.oneOf(layouts),
    background: MicromagPropTypes.backgroundElement,
    current: PropTypes.bool,
    active: PropTypes.bool,
    renderFormat: MicromagPropTypes.renderFormat,
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
    renderFormat: 'view',
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
    renderFormat,
    maxRatio,
    transitions,
    className,
}) => {
    const autoPlay = false; // props?
    const { width, height } = useScreenSize();
    const { isPreview, isEditor, isPlaceholder, isView } = getRenderFormat(renderFormat);
    const { video = null, params = {} } = videoField || {};
    const isNonInteractive = isPlaceholder || isPreview;
    const autoplayCondition = isEditor ? autoPlay && active : autoPlay && !isNonInteractive;
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
                width={isFullScreen ? '100%' : undefined }
                height={isFullScreen ? '100%' : undefined }
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
                    showEmpty={isEditor}
                    className={styles.video}
                    onReady={onVideoReady}
                />
            </Transitions>
        );
    }


    return (
        <div className={classNames([
            styles.container,
            {
                [className]: className !== null,
                [styles.placeholder]: isPlaceholder,
                [styles.fullscreen]: isFullScreen,
            },
        ])}>
            <Background
                {...(!isPlaceholder ? background : null)}
                width={width}
                height={height}
                playing={(isView && current) || (isEditor && active)}
                maxRatio={maxRatio}
            />
            <Container width={width} height={height} maxRatio={maxRatio}>
                <div className={styles.content}>
                    { videoElement }
                </div>
            </Container>
        </div>
    );
};

VideoScreen.propTypes = propTypes;
VideoScreen.defaultProps = defaultProps;

export default React.memo(VideoScreen);
